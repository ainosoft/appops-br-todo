import { HttpServiceInvoker } from "@ainosoft/appops-br-core-components/components/appops-common/fetch-br/dist/http-service-invoker.js";
export class TodoService {
    getToDosByPage(startIndex, pageSize) {
        return new HttpServiceInvoker(startIndex, pageSize);
    }
}
//# sourceMappingURL=TodoService.js.map