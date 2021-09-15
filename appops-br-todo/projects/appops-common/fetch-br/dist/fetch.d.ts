import { HttpClient } from '@angular/common/http';
export interface Service {
    HttpPost(...args: any[]): Promise<Object>;
    HttpGet(...args: any[]): Promise<Object>;
}
export declare class FetchService implements Service {
    cfgApiBaseUrl: string;
    http: HttpClient;
    constructor();
    /**
     * @param baseUrl api
     * @param opParamMap parameters
     */
    HttpPost(args: any[], path: any, header?: any): Promise<Object>;
    /**
     *
     * @param baseUrl
     * @param opParamMap
     */
    HttpGet(args: any[], path: any, header?: any): Promise<Object>;
    /**
     * Http post request and return promise
     * @param baseUrl api
     * @param opParamMap parameters
     */
    private getPromiseByPost;
    /**
     * Http get request and return promise
     * @param baseUrl api
     * @param opParamMap parameters
     */
    private getPromiseByGet;
}
