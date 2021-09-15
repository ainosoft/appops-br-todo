import { HttpClient } from '@angular/common/http';
export interface Service {
    HttpPost(appToken: string, operationSignature: string, ...args: any): Promise<Object>;
}
declare class ServiceMethod {
    appToken: string;
    operationSignature: string;
    arguments: any[];
}
export declare class FetchService implements Service {
    private http;
    serviceMethod: ServiceMethod;
    appName: string;
    constructor(http: HttpClient);
    private getRequestQueryString;
    private getRequestData;
    private getRequestUri;
    HttpPost(appToken: string, operationSignature: string, ...args: any[]): Promise<Object>;
    private getPromiseByPost;
}
export {};
