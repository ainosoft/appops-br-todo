import { ColumnConfig } from "./ColumnConfig";
import { Injectable } from "@angular/core";
import { FeatureConfig } from './FeatureConfig';
import { ActionConfig } from "./ActionConfig";
import { PagingConfig } from './PagingConfig';

@Injectable({
    providedIn: 'root'
})
export class GridConfig {

    private gridHeader: string;
    private pageSize:number;
    private totalRecords: number;
    private columnConfigArr: ColumnConfig[];
    private actionConfigArr: ActionConfig[];
    private featureConfigArr: FeatureConfig[];
    private pagingConfigArr: PagingConfig[];
   
    constructor() {
        this.actionConfigArr = new Array();
        this.featureConfigArr = new Array();
        this.pagingConfigArr = new Array();
        this.columnConfigArr = new Array();
        this.columnConfigArr.push(new ColumnConfig("checkbox", "", 0));
    }

    public get getGridHeader(): string {
        return this.gridHeader;
    }
    public set setGridHeader(value: string) {
        this.gridHeader = value;
    }

    public get getPageSize() {
        return this.pageSize;
    }
    public set setPageSize(value) {
        this.pageSize = value;
    }

    public get getTotalRecords() {
        return this.totalRecords;
    }
    public set setTotalRecords(value) {
        this.pageSize = value;
    }

    public get getColumnConfigArr(): ColumnConfig[] {
        return this.columnConfigArr;
    }

    public addColumnConfig(name: string, item: string, position: number) {
        if (position <= 0) {
            throw "The Column position must start from 1";
        }
        this.columnConfigArr.push(new ColumnConfig(name, item, position));
    }

    public actionConfig(name: string, enable: boolean, token: string, isBulk: boolean, type?: string, positionType?: string, isIcon?: boolean, iconName?: string, tooltip?: string) {
        this.actionConfigArr.push(new ActionConfig(name, enable, token, isBulk, type, positionType, isIcon, iconName, tooltip));
    }

    public featureConfig(name: string, enable: boolean) {
        this.featureConfigArr.push(new FeatureConfig(name, enable));
    }

    public pagingConfig(name: string, enable: boolean, token: string, pagingType: string, icon?: boolean, iconName?: string, tooltip?: string) {
        this.pagingConfigArr.push(new PagingConfig(name, enable, token, pagingType, icon, iconName, tooltip));
    }
}