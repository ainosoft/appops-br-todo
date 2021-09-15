import { BehaviorSubject, Observable, merge } from 'rxjs';
import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { map } from 'rxjs/internal/operators/map';
import { ChangeDetectorRef, Injectable, OnDestroy, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ActionDispatcher } from '../action/ActionDispatcher';
import { SearchItemNode } from './enterprise-tree.component';

/** Flat node with expandable and level information */
export class DynamicFlatNode {
    constructor(
        public item?: string,
        public level?: number,
        public resultObject?: Object,
        public expandable?: boolean,
        public isLoading?: boolean,
        public code?: string,
        public children?: DynamicFlatNode[]
    ) { }
}

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
@Injectable()
export class DynamicDatabase {
    dataChange = new BehaviorSubject<SearchItemNode[]>([]);

    get data(): SearchItemNode[] { return this.dataChange.value; }

    dataMap = new Map<string, string[]>();

    nodeLevelMethodConfigurations = new Map<number, string>();

    nodePropertyNames = new Map<number, string>();

    currentLeafNodeNames = new Array();

    filteredMode: boolean = false;

    pagingMode: boolean = true;

    rootLevelName;

    rootLevelNodes = [];

    currentSelectedNode: DynamicFlatNode = new DynamicFlatNode();

    public currentSelectedNodeSource = new BehaviorSubject<DynamicFlatNode>(this.currentSelectedNode);
    currentSelectedNodeValue = this.currentSelectedNodeSource.asObservable();

    get getCurrentSelectedNode() {
        return this.currentSelectedNode;
    }

    set setCurrentSelectedNode(value) {
        this.currentSelectedNode = value;
        this.currentSelectedNodeSource.next(this.currentSelectedNode);
    }

    get getRootLevelNodes() {
        return this.rootLevelNodes;
    }

    set setRootLevelNodes(value) {
        this.rootLevelNodes = value;
    }

    public currentSelectedLeafNodeSource = new BehaviorSubject<any>(this.currentLeafNodeNames);
    currentSelectedLeafNodeValue = this.currentSelectedLeafNodeSource.asObservable();

    get getCurrentSelectedLeafNode() {
        return this.currentLeafNodeNames;
    }

    set setCurrentSelectedLeafNode(value) {
        this.currentLeafNodeNames = value;
        this.currentSelectedLeafNodeSource.next(this.currentLeafNodeNames);
    }

    /** Initialize data for root level nodes */
    initialData(): DynamicFlatNode[] {

        return this.rootLevelNodes.map(result => new DynamicFlatNode(result[this.rootLevelName], 0, result, true));
    }


    getChildren(node: string): string[] | undefined {
        return this.dataMap.get(node);
    }

    isExpandable(node: string): boolean {
        return this.dataMap.has(node);
    }
}


/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
@Injectable()
export class DynamicDataSource implements OnInit, OnDestroy {

    dataChange: BehaviorSubject<DynamicFlatNode[]> = new BehaviorSubject<DynamicFlatNode[]>([]);
    operationList;
    currentService: string;



    private actionDispatcher: ActionDispatcher;

    get data(): DynamicFlatNode[] {
        return this.dataChange.value;
    }

    set data(value: DynamicFlatNode[]) {
        this.treeControl.dataNodes = value;
        this.dataChange.next(value);
    }

    public set setActionDispatcher(value: any) {
        this.actionDispatcher = value;
    }

    constructor(private treeControl: FlatTreeControl<DynamicFlatNode>, private database: DynamicDatabase, private changeDetectorRef: ChangeDetectorRef) {

    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    public ngOnDestroy(): void {
        this.changeDetectorRef.detach();
    }

    connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
        this.treeControl.expansionModel.onChange!.subscribe(change => {
            if ((change as SelectionChange<DynamicFlatNode>).added ||
                (change as SelectionChange<DynamicFlatNode>).removed) {
                this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
            }
        });

        return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataChange.complete();
    }

    /** Handle expand/collapse behaviors */
    handleTreeControl(change: SelectionChange<DynamicFlatNode>) {

        if (change.added) {
            change.added.forEach(node => this.toggleNode(node, true));
        }
        if (change.removed) {
            change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
        }
    }

    /**
     * Toggle the node for the selected node, and make server call to get it's children.
     */
    toggleNode(node: DynamicFlatNode, expand: boolean) {

        let currentPropertyName;

        this.database.filteredMode = false;

        if (this.database.filteredMode === false) {

            this.database.setCurrentSelectedNode = node;

            for (let [level, token] of this.database.nodeLevelMethodConfigurations) {
                if (level === node.level) {

                    /** Dispatch action for leaf node. */
                    if (level === this.database.nodeLevelMethodConfigurations.size - 1) {

                        this.actionDispatcher.dispatchAction(token, node.resultObject).then(
                            result => {
                                let currentLeafNodeNames = new Array();

                                for (let [level, propName] of this.database.nodePropertyNames) {
                                    if (level === node.level) {
                                        currentPropertyName = propName;
                                    }
                                }

                                if(result != null) {

                                    for (let i = 0; i < result.length; i++) {

                                        currentLeafNodeNames.push(result[i][currentPropertyName]);
                                    }
                                }

                                this.database.setCurrentSelectedLeafNode = result;

                            }
                        );

                    } else {
                        node.isLoading = true;

                        this.actionDispatcher.dispatchAction(token, node.resultObject).then(
                            result => {
                                this.populateNodeList(result, node, expand);
                            }
                        );
                    }
                }
            }
        }

    }

    /** Populate parent nodes with their children*/
    populateNodeList(nodeList, node, expand) {

        let nodeNames = new Array();
        let currentPropertyName;

        for (let [level, propName] of this.database.nodePropertyNames) {
            if (level === node.level) {
                currentPropertyName = propName;
            }
        }

        if (nodeList != null) {

            for (let i = 0; i < nodeList.length; i++) {

                nodeNames.push(nodeList[i][currentPropertyName]);
            }

            this.database.dataMap.set(node.item, nodeNames);

            this.expandChildNodes(node, expand, nodeList, nodeNames);

        } else {
            node.isLoading = false;
            return;
        }
    }

    /** Expand child nodes */
    expandChildNodes(node: DynamicFlatNode, expand: boolean, nodeList, childNodes) {

        const children = this.database.getChildren(node.item);
        const index = this.data.indexOf(node);

        if (!children || index < 0) { // If no children, or cannot find the node, no op
            console.log("no children returning");
            return;
        }

        if (expand) {

            let i = 0;

            /** Create new child nodes */
            const nodes = nodeList.map(result => new DynamicFlatNode(childNodes[i++], node.level + 1, result, this.database.isExpandable(node.item)));

            this.data.splice(index + 1, 0, ...nodes);

        } else {
            let count = 0;
            for (let i = index + 1; i < this.data.length && this.data[i].level > node.level; i++, count++) { }
            this.data.splice(index + 1, count);
        }

        /** notify the change */
        this.dataChange.next(this.data);
        node.isLoading = false;
        this.changeDetectorRef.detectChanges();
    }
}