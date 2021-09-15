export interface TreeData {

    getRootNodeData(id: number,pageSize: number): Promise<any>;

    getNextPage(id: number, pageSize: number): Promise<any>;

    getSearchResultDataHierarchyCode(resultObj: Object): Object[];
}