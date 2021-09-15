import { Component, OnInit, Injectable, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TreeData } from '../action/TreeData';
import { ActionDispatcher } from '../action/ActionDispatcher';
import { FlatTreeControl } from '@angular/cdk/tree';
import { DynamicDatabase, DynamicFlatNode, DynamicDataSource } from './dynamic-data-source.component';
import { ActionsAndToolsConfig } from '../config/ActionsAndToolsConfig';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { TreeConfig } from '../config/TreeConfig';

/**
 * Node for to-do item
 */
export class SearchItemNode {
  children: SearchItemNode[];
  item: string;
  code: string;
  resultObject: Object;
}

/** Flat to-do item node with expandable and level information */
export class SearchItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
  code: string;
  resultObject: Object;
}


@Component({
  selector: 'ao-enterprise-tree',
  templateUrl: './enterprise-tree.component.html',
  styleUrls: ['./enterprise-tree.component.css'],
  providers: [DynamicDatabase],
  changeDetection: ChangeDetectionStrategy.Default,
})
@Injectable({
  providedIn: 'root'
})
export class EnterpriseTreeComponent implements OnInit, OnDestroy {

  treeConfig = new Array();

  treeDataList = new Array();

  treeData: TreeData;

  treeHeader: string = '';

  //Search Value
  searchValue: string;

  //Search Name Suggestion
  searchNameSuggestion = [];

  //Clear Filter
  clearFliter: boolean = false;

  //Add Filter Button loop
  filterSelectedValue = {};

  //Display filter loop 
  displayFilterValue = [];

  //Key for search data
  getKey;

  counter: number = 0;

  pageNumber: number = 1;

  pageSize: number = 12;

  rootLevelNode: string = '';

  //Total tree node levels
  totalLevels: number = 0;

  enableActionToolbar = new ActionsAndToolsConfig("enableActionToolbar", false, '');
  enableSearchToolBar = new ActionsAndToolsConfig("enableSearchToolBar", false, '');
  enableSearchPlaceholder = new ActionsAndToolsConfig("enableSearchPlaceholder", false, '');
  enableSearchBar = new ActionsAndToolsConfig("enableSearchBar", false, '');
  enableInitialText = new ActionsAndToolsConfig("enableInitialText", false, '');
  enableNodeDetails = new ActionsAndToolsConfig("enableNodeDetails", false, '');
  enableLeafNodeDetails = new ActionsAndToolsConfig("enableLeafNodeDetails", false, '');
  nodeFilteration = new ActionsAndToolsConfig("nodeFilteration", true, '');

  enableAppToolButton = new ActionsAndToolsConfig("enableAppToolButton", false, '');
  openAppSameWindow = new ActionsAndToolsConfig("openAppSameWindow", false, '');
  openAppNewTab = new ActionsAndToolsConfig("openAppNewTab", false, '');

  currentNodeDetailList = new Map();

  currentLeafNodeDetailList = new Array();

  //Leaf node grid view column names
  leafColumnConfig = new Array();

  //Leaf node data
  treeLeafDataList = new Array();

  //Leaf node title in Summary details
  leafNodeTitle = '';

  //Leaf node name in result json object
  leafNodeName = '';

  //Leaf node code list for displaying result object of search services by text(In filtered Mode = On)
  nodeCodeList = [];

  leafContainerElement;
  row: HTMLTableRowElement;
  tdElement: HTMLTableCellElement;
  thElement: HTMLTableHeaderCellElement;

  private actionDispatcher: ActionDispatcher;

  flatNodeMap = new Map<SearchItemFlatNode, SearchItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<SearchItemNode, SearchItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: SearchItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<any>;

  dataSource;

  treeFlattener: MatTreeFlattener<SearchItemNode, SearchItemFlatNode>;

  getLevel = (node: SearchItemFlatNode) => node.level;

  isExpandable = (node: SearchItemFlatNode) => node.expandable;

  getChildren = (node: SearchItemNode): SearchItemNode[] => node.children;

  hasChild = (_: number, _nodeData: SearchItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: SearchItemFlatNode) => _nodeData.item === '';

  transformer = (node: SearchItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
      ? existingNode
      : new SearchItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  @ViewChild(CdkVirtualScrollViewport, { static: false }) virtualScroll: CdkVirtualScrollViewport;

  constructor(private database: DynamicDatabase, private treeConfiguration: TreeConfig, private ref: ChangeDetectorRef) {

    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, this.database, this.ref);

    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);

    this.database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  /** Destroys/Detaches the change detection reference. */
  public ngOnDestroy(): void {
    this.ref.detach();
  }

  public ngOnInit() {
    this.leafColumnConfig = [];

    /** Subscribes to the current selected node value. */
    this.database.currentSelectedNodeValue.subscribe((node) => {

      if (node.item !== undefined) {
        this.enableInitialText.setEnable = false;
        this.enableNodeDetails.setEnable = true;

        if (this.enableLeafNodeDetails.enable === true) {
          this.enableLeafNodeDetails.enable = false;
        }

        this.currentNodeDetailList.clear();
        this.clearLeafTableData();

        this.printDetails(node.resultObject);
        this.ref.detectChanges();
      }
    });

    /** Subscribes to the current selected leaf node value. */
    this.database.currentSelectedLeafNodeValue.subscribe((result) => {

      if (result.length !== 0) {
        this.enableInitialText.setEnable = false;
        this.enableNodeDetails.setEnable = true;
        this.enableLeafNodeDetails.setEnable = true;
        this.treeLeafDataList = result;
        this.ref.detectChanges();
        this.createLeafNodeDetailGrid();
      }
    });
  }

  /** Method displays the node details(other than leaf node) for the selected tree node. */
  printDetails(nodeDetailObj) {

    if (this.database.filteredMode === true) {
      if (this.enableLeafNodeDetails.enable === true) {
        this.enableLeafNodeDetails.enable = false;
      }
    }

    for (const i in nodeDetailObj) {
      if (nodeDetailObj[i] instanceof Object) {
        this.printDetails(nodeDetailObj[i]);

      } else {
        for (const [key, value] of Object.entries(nodeDetailObj)) {
          if (value instanceof Array) {

            delete nodeDetailObj[key];

          }
          this.currentNodeDetailList.set(i, nodeDetailObj[i]);
        }
      }
    }

  }

  /** Sets the tree data */
  set setTreeData(data) {
    this.treeData = data;
  }

  /** Set action dispatcher value @param value to Data Source. */
  public set setActionDispatcher(value: any) {
    this.actionDispatcher = value;
    this.dataSource.setActionDispatcher = value;
  }

  /** Sets tree configurations @param data to enterprise tree respective properties. */
  set setTreeConfig(data) {

    if (data.pageSize != undefined || data.pageSize != null) {
      this.pageSize = data.pageSize;
    }

    this.treeHeader = data.treeHeader;
    this.treeConfig = data.actionsAndToolsArr;
    this.rootLevelNode = data.rootLevelNode;
    this.totalLevels = data.totalLevels;
    this.leafNodeTitle = data.leafNodeTitle;
    this.leafNodeName = data.leafNodeName;
    this.treeConfiguration.setTotalLevels = data.totalLevels;
    this.leafColumnConfig = data.leafColumnConfigArr;

    this.sortTreeConfig(this.treeConfig);
    this.setTreeDataToTreeView();
  }

  /**
   * This method sorts the tree configuration.
   * @param treeConfig JSON object of tree configuration.
   */
  sortTreeConfig(treeConfig) {
    let enterpTreeCompKeys = Object.getOwnPropertyNames(this);

    for (let i = 0; i < enterpTreeCompKeys.length; i++) {
      for (let j = 0; j < treeConfig.length; j++) {
        if (treeConfig[j].name === enterpTreeCompKeys[i]) {
          this[enterpTreeCompKeys[i]] = treeConfig[j];
          break;
        }
      }
    }

    for (let j = 0; j < treeConfig.length; j++) {
      if (treeConfig[j].type === 'node_action') {

        this.database.nodeLevelMethodConfigurations.set(treeConfig[j].level, treeConfig[j].token);

        this.database.nodePropertyNames.set(treeConfig[j].level, treeConfig[j].nodePropertyName);

      }
    }

  }

  /** 
   * Initialize the root level tree data to @rootLevelNodes & root level node name to @rootLevelNode */
  setTreeDataToTreeView() {

    this.treeData.getRootNodeData(this.pageNumber, this.pageSize).then(
      result => {
        this.database.rootLevelName = this.rootLevelNode;
        this.database.rootLevelNodes = result;

        this.dataSource.data = this.database.initialData();
      }
    );
  }

  /**
   * Append the next batch of tree data to @rootLevelNodes */
  getNextBatchOfPage() {

    if (Math.floor(this.virtualScroll.measureScrollOffset('bottom')) === 0) {

      console.log(Math.floor(this.virtualScroll.measureScrollOffset('bottom')), "getNextBatchOfPage ");

      if (this.database.pagingMode === true) {

        this.treeData.getNextPage(++this.pageNumber, this.pageSize).then(
          result => {

            if (result != null) {
              this.treeDataList = result;

              this.database.rootLevelName = this.rootLevelNode;

              for (let i = 0; i < this.treeDataList.length; i++) {
                this.database.rootLevelNodes.push(this.treeDataList[i]);
              }

              this.dataSource.data = this.database.initialData();

            } else {
              return;
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

  /** Filters the tree data with input of text type. */
  filterNodes(filterText: string) {

    this.database.filteredMode = true;
    this.database.pagingMode = false;

    if (filterText) {
      this.enableInitialText.setEnable = true;
      this.enableNodeDetails.setEnable = false;

      this.actionDispatcher.dispatchAction(this.nodeFilteration.token, filterText).then(
        result => {

          /** Set the tree control for SearchItemFlatNodes. */
          this.treeControl = new FlatTreeControl<SearchItemFlatNode>(this.getLevel, this.isExpandable);

          /** Set the data Source for SearchItemFlatNodes and SearchItemNode. */
          this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

          if (result.length > 0) {

            this.createSearchedNodes(result);

          }
        });
    }
    if (filterText === '') {
      this.enableInitialText.setEnable = true;
      this.enableNodeDetails.setEnable = false;
      this.enableLeafNodeDetails.setEnable = false;
      this.ref.detectChanges();

      this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
      this.dataSource = new DynamicDataSource(this.treeControl, this.database, this.ref);

      this.dataSource.setActionDispatcher = this.actionDispatcher;

      this.database.pagingMode = true;

      this.setTreeDataToTreeView();
      this.treeControl.collapseAll();
    }
    this.ref.detectChanges();
  }

  /** Creates tree view Nodes for searched data result. */
  createSearchedNodes(result) {

    /** Generates the hierarchy code for the searched data result. */
    this.nodeCodeList = this.treeData.getSearchResultDataHierarchyCode(result);

    this.dataSource.data = this.nodeCodeList;

    /** Builds the Searched result tree along with its children nodes. */
    const data = this.buildSearchResultTree(this.nodeCodeList, '0');

    /** Notify the change. */
    this.database.dataChange.next(data);

    this.treeControl.expandAll();
  }

  /**
  * Builds the search data structure tree view. The `value` is the Json object, or a sub-tree of a Json object.
  * The return value is the list of `SearchItemNode`.
  */
  buildSearchResultTree(searchDataObj: any[], level: string): SearchItemNode[] {

    return searchDataObj.filter(o =>
      (<string>o.code).startsWith(level + '.')
      && (o.code.match(/\./g) || []).length === (level.match(/\./g) || []).length + 1).map(o => {

        const node = new SearchItemNode();
        node.item = o.item;
        node.code = o.code;
        node.resultObject = o.resultObject;

        const children = searchDataObj.filter(so => (<string>so.code).startsWith(level + '.'));

        if (children && children.length > 0) {
          node.children = this.buildSearchResultTree(children, o.code);
        }
        return node;
      });
  }

  /** Displays the node details in the Summary details UI section for the selected node. */
  displayCurrentSearchNodeDetails(node) {

    /** Checks whether filter mode is On. */
    if (this.database.filteredMode === true) {
      for (let i = 0; i < this.nodeCodeList.length; i++) {
        if (node.item === this.nodeCodeList[i].item) {

          /** Checks whether the node is a leaf node. */
          if (node.level === (this.database.nodePropertyNames.size - 1)) {

            let temp = JSON.parse(JSON.stringify(this.nodeCodeList[i]));
            delete temp.resultObject[this.leafNodeName];
            this.database.setCurrentSelectedNode = temp;

            let result = Object.values(this.nodeCodeList[i].resultObject[this.leafNodeName]);
            this.database.setCurrentSelectedLeafNode = result;
          } else {
            node.resultObject = this.nodeCodeList[i].resultObject;
            this.database.setCurrentSelectedNode = node;
          }
        }
      }
    } else {
      this.database.setCurrentSelectedNode = node;
    }
  }

  /** Clears the previously rendered data in leaf detail grid. */
  clearLeafTableData() {

    let tableHeadings = document.getElementsByTagName("th");
    const tableHeadDiv = document.getElementsByClassName("th-div")[0] as HTMLElement;

    for (let i = 0; i < tableHeadings.length;) {
      (tableHeadings[i] as HTMLElement).remove();
    }

    let tableRows = document.getElementsByTagName("tr");
    for (let i = 0; i < tableRows.length;) {
      (tableRows[i] as HTMLElement).remove();
    }
  }

  /** Creates leaf node grid view. */
  createLeafNodeDetailGrid() {
    this.leafContainerElement = document.getElementById('leaf-container');

    /** Creates leaf node grid headings. */
    this.createLeafTableHeading();

    let tableDataCell = null;
    let tableRowData = null;
    this.counter = 0;

    for (; this.counter < this.treeLeafDataList.length; this.counter++) {

      /** Creates leaf node rows for grid view. */
      this.createLeafRows(this.counter);

      for (let moduleListKey in this.treeLeafDataList[this.counter]) {
        for (let i = 0; i < this.leafColumnConfig.length; i++) {

          if (this.leafColumnConfig[i].name === moduleListKey) {

            var table = document.getElementsByClassName("table-row-data");

            var lastRowIndex = table.length;

            tableRowData = document.getElementsByClassName('table-row-data')[lastRowIndex - 1] as HTMLTableRowElement;

            tableDataCell = tableRowData.cells;

            let pos = this.leafColumnConfig[i].position;

            let value = this.treeLeafDataList[this.counter][moduleListKey];

            tableDataCell[pos].innerHTML = value;

          }
        }
      }

      tableDataCell[tableDataCell.length - 1].style.right = 0 + "px";
      tableDataCell[tableDataCell.length - 1].style.width = 5 + '%';
      tableDataCell[tableDataCell.length - 1].style.height = "40px";
      tableDataCell[tableDataCell.length - 1].style.whiteSpace = 'nowrap';
      tableDataCell[tableDataCell.length - 1].style.backgroundColor = "white";
      tableDataCell[tableDataCell.length - 1].style.maxWidth = "100px";
      tableDataCell[tableDataCell.length - 1].style.overflow = "hidden";
      tableDataCell[tableDataCell.length - 1].style.textOverflow = "ellipsis";
    }
  }

  /**
   * Creates leaf node grid headings.
  */
  createLeafTableHeading(): void {
    const tableHeadDiv = document.getElementsByClassName("th-div")[0] as HTMLElement;

    for (let i = 0; i < this.leafColumnConfig.length; i++) {
      this.thElement = document.createElement('th');
      this.thElement.style.padding = '10px';
      this.thElement.style.textAlign = 'left';
      this.thElement.style.borderBottom = '1px solid #ddd';
      this.thElement.style.fontFamily = '"Questrial", sans-serif';
      this.thElement.style.border = 'none';
      this.thElement.style.outline = 'none';
      this.thElement.style.fontSize = '14px';
      this.thElement.style.letterSpacing = '1px';
      this.thElement.style.height = '16px';
      this.thElement.style.color = 'rgba(0,0,0,.54)';
      // this.thElement.whiteSpace = 'nowrap';
      this.thElement.style.width = 5 + '%';

      const headName = this.leafColumnConfig[i].name;
      this.thElement.innerHTML = this.leafColumnConfig[i].item;
      this.thElement.classList.add(headName);

      tableHeadDiv.appendChild(this.thElement);
    }
  }

  /**
   * Creates leaf node rows for leaf node detail grid view.
   * @param value leaf data list element counter value.
   */
  createLeafRows(value) {
    this.row = document.createElement('tr');

    this.row.style.background = 'white';
    this.row.style.padding = '5px';
    this.row.classList.add("table-row-data");

    this.leafContainerElement.appendChild(this.row);
    this.styleLeafCells();
  }

  /** Styles the leaf grid view cells with CSS. */
  styleLeafCells() {

    for (let i = 0; i < this.leafColumnConfig.length; i++) {
      this.tdElement = document.createElement('td');
      this.tdElement.style.paddingTop = '10px';
      this.tdElement.style.paddingBottom = '10px';
      this.tdElement.style.padding = '10px';
      this.tdElement.style.textAlign = 'left';
      this.tdElement.style.borderBottom = '1px solid #ddd';
      this.tdElement.style.fontFamily = '"Questrial", sans-serif';
      this.tdElement.style.border = 'none';
      this.tdElement.style.outline = 'none';
      this.tdElement.style.height = '39px';
      this.tdElement.style.verticalAlign = 'middle';
      this.tdElement.style.width = 5 + '%';
      this.row.appendChild(this.tdElement);
    }

  }

  /** Opens the node app in the same window. */
  openAppInSameWindow(token, nodeName) {

    this.actionDispatcher.dispatchAction(token, nodeName.toLowerCase());

    this.closeDropdown();
  }

  /** Opens the node app in the new tab. */
  public openAppInNewTab(token, nodeName) {

    this.actionDispatcher.dispatchAction(token, nodeName.toLowerCase());

    this.closeDropdown();
  }

  /** Closes the open-app functionality's menu-dropdown. */
  closeDropdown() {
    let dropdownsContents = document.getElementsByClassName('dropdown-content');

    for (let i = 0; i < dropdownsContents.length; i++) {
      const openDropdown = dropdownsContents[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }

  /** Expands/Opens the open-app functionality's menu-dropdown. */
  public showDropdown($event) {

    if ($event.target.matches('.app-dropdown-button')) {

      if ($event.target.offsetParent.nextSibling != null && $event.target.offsetParent.nextSibling.matches('.dropdown-content')) {
        $event.target.offsetParent.nextSibling.classList.toggle("show");

      } else if ($event.target.nextSibling != null && $event.target.nextSibling.matches('.dropdown-content')) {
        $event.target.nextSibling.classList.toggle("show");
      }
    }
  }
} 