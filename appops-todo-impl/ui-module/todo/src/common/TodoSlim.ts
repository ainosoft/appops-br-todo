export class TodoSlim {
    private todoId: number;
    public get getTodoId(): number {
        return this.todoId;
    }
    public set setTodoId(value: number) {
        this.todoId = value;
    }
    private todoName: string;
    public get getTodoName(): string {
        return this.todoName;
    }
    public set setTodoName(value: string) {
        this.todoName = value;
    }


}
