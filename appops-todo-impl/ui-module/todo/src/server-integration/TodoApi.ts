export interface TodoApi {
    getTodoList(): Promise<any>;
    addNewTodo(todoSlim): Promise<any>;
    deleteTodo(todoId): Promise<any>;
}