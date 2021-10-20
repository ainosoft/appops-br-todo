import { HttpServiceInvoker } from "@ainosoft/appops-br-core-components/components/appops-common/fetch-br/dist/http-service-invoker.js";
export class TodoApi {
    getTodoList() {
        return new HttpServiceInvoker();
    }
    addNewTodo(todoSlim) {
        return new HttpServiceInvoker(todoSlim);
    }
    deleteTodo(todoId) {
        return new HttpServiceInvoker(todoId);
    }
}
//# sourceMappingURL=TodoApi.js.map