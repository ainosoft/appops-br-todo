export interface TodoService {

    getToDosByPage(startIndex,pageSize):Promise<any>;

}
