export interface GridData {
    getFirstPage(id:number,pageSize:number):Promise<any>;
    getNextPage(id:number,pageSize:number):Promise<any>;
    onGridDataLoad(data):void;
}