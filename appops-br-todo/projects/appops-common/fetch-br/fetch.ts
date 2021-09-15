import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface Service {

    HttpPost(...args): Promise<Object>;

    HttpGet(...args): Promise<Object>;
}


@Injectable({
    providedIn: 'root'
})
export class FetchService implements Service {

    //Service Name.
    cfgApiBaseUrl: string = window['cfgApiBaseUrl'];

    http = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));

    constructor() {
    }

    /**
     * @param baseUrl api
     * @param opParamMap parameters
     */
    HttpPost(args: any[], path, header?: any): Promise<Object> {
        console.log(header);
        let opParamMap = {};

        for (let i = 0; i < args.length; i++) {
            opParamMap[i] = { "value": args[i] }
        }

        console.log(opParamMap, path);
        return this.getPromiseByPost(path, opParamMap, header);
    }


    /**
     * 
     * @param baseUrl 
     * @param opParamMap 
     */
    HttpGet(args: any[], path, header?: any): Promise<Object> {
        var opParamMap = "";
        let value = args;
        if (value.length != 0 && String(value[0].includes("RESPONSE_TYPE"))) {
            opParamMap = "?" + value[0];
            value.splice(0, 1);
        }
        for (var i = 0; i < value.length; i++) {
            if (i == 0) {
                if (opParamMap != "") {
                    opParamMap += "&" + i + "=" + value[i];
                } else {
                    opParamMap = "?" + i + "=" + value[i];
                }
            } else {
                opParamMap += "&" + i + "=" + value[i];

            }

        }
        return this.getPromiseByGet(path, opParamMap, header);;
    }

    /**
     * Http post request and return promise
     * @param baseUrl api 
     * @param opParamMap parameters
     */
    private getPromiseByPost(opPath: String, opParamMap, header?): Promise<Object> {
        let opUrl = null;
        if (this.cfgApiBaseUrl.charAt(this.cfgApiBaseUrl.length - 1) == '/') {
            opUrl = this.cfgApiBaseUrl + "Op";
        } else {
            opUrl = this.cfgApiBaseUrl + "/Op";
        }

        const promise = this.http.post(opUrl + opPath, opParamMap, header).toPromise();
        promise.then(
            (result: any) => {
                if (result != null && result != undefined && result.hasOwnProperty('redirectUrl')) {
                    window.open(result['redirectUrl'], "_self");
                }
            },
            (error: any) => {
                console.log(error);
            }
        );
        return promise;
    }


    /**
     * Http get request and return promise
     * @param baseUrl api
     * @param opParamMap parameters
     */

    private getPromiseByGet(opPath: String, opParamMap, header?): Promise<Object> {
        let opUrl = null;
        if (this.cfgApiBaseUrl.charAt(this.cfgApiBaseUrl.length) == '/') {
            opUrl = this.cfgApiBaseUrl + "Op";
        } else {
            opUrl = this.cfgApiBaseUrl + "/Op";

        }

        const promise = this.http.get(opUrl + opPath + opParamMap, header).toPromise();
        promise.then(
            (result: any) => {
                console.log(result);
            },
            (error: any) => {
                console.log(error);
            }
        );
        return promise;
    }
}
