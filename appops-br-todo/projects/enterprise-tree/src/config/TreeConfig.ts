import { ActionsAndToolsConfig } from './ActionsAndToolsConfig';
import { Injectable } from '@angular/core';
import { LeafColumnConfig } from './LeafColumnConfig';

@Injectable({
    providedIn: 'root'
})
export class TreeConfig {

    public treeHeader: string;
    public totalLevels: number;
    public rootLevelNode : string;
    public actionsAndToolsArr: ActionsAndToolsConfig[] = new Array();
    public pageSize: number;
    public leafNodeTitle: string;
    public leafNodeName: string;
    public leafColumnConfigArr: LeafColumnConfig[] = new Array();
    
    constructor() {

    }

    public get getTreeHeader(): string {
        return this.treeHeader;
    }

    public set setTreeHeader(value: string) {
        this.treeHeader = value;
    }

    public get getTotalLevels(): number {
        return this.totalLevels;
    }

    public set setTotalLevels(value: number) {
        this.totalLevels = value;
    }

    public get getRootLevelNode(): string {
        return this.rootLevelNode;
    }

    public set setRootLevelNode(value: string) {
        this.rootLevelNode = value;
    }

    public addActionsAndToolConfig(name: string, enable: boolean, token: string, level?: number, type?: string, isIcon?: boolean, nodeName?: string, isApp?: boolean) {
        this.actionsAndToolsArr.push(new ActionsAndToolsConfig(name, enable, token, level, type, isIcon, nodeName, isApp));
    }

    public get getPageSize() {
        return this.pageSize;
    }
    public set setPageSize(value) {
        this.pageSize = value;
    }

    public get getLeafNodeTitle() {
        return this.leafNodeTitle;
    }

    public set setLeafNodeTitle(value) {
        this.leafNodeTitle = value;
    }

    public get getLeafNodeName() {
        return this.leafNodeName;
    }

    public set setLeafNodeName(value) {
        this.leafNodeName = value;
    }

    public get getLeafNodeColumnConfig(): LeafColumnConfig[] {
        return this.leafColumnConfigArr;
    }

    public addLeafNodeColumnConfig(name: string, item: string, position: number) {
        this.leafColumnConfigArr.push(new LeafColumnConfig(name, item, position));
    }
}