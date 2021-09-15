import { FetchService } from "./fetch.js";
export declare class HttpServiceInvoker {
    fetch: FetchService;
    parameters: any;
    header: any;
    serviceName: string;
    constructor(...args: any[]);
    get(path: string): Promise<Object>;
    post(path: string): Promise<Object>;
    addHeader(header?: any): this;
    setServiceName(serviceName: any): HttpServiceInvoker;
}
