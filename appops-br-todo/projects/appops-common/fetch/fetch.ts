import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface Service {
     HttpPost(appToken: string, operationSignature: string, ...args: any):Promise<Object>;
}
class ServiceMethod {
    appToken: string;
    operationSignature: string ;
    arguments: any[];
}
@Injectable({
    providedIn: 'root'
})
export class FetchService implements Service {
    serviceMethod: ServiceMethod;
    appName: string = window["appName"];
    constructor(private http: HttpClient) {
    }
    private getRequestQueryString(): string {
        const queryString = "?isTypeScript=true";
        return queryString;
    }
    private getRequestData(): string {
        const queryString = JSON.stringify(this.serviceMethod);
        return queryString;
    }
    private getRequestUri(): string {
        const baseUrl = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port
        if (this.appName === undefined || this.appName === null || this.appName === '') {
            const url = baseUrl + "/OpInvoke/Op" + this.getRequestQueryString();
            console.log(url)
            return url;
        } else {
            const url = baseUrl + this.appName + "/OpInvoke/Op" + this.getRequestQueryString();
            console.log(url)
            return url;
        }
    }
    HttpPost(appToken: string, operationSignature: string, ...args: any[]): Promise<Object> {
        const serviceMethod: ServiceMethod = new ServiceMethod();
        serviceMethod.appToken = appToken;
        serviceMethod.operationSignature = operationSignature;
        serviceMethod.arguments = [];
        args.forEach(value => {
            serviceMethod.arguments.push(value);
        });
        this.serviceMethod = serviceMethod;
        const body = this.getRequestData();
        const promise = this.getPromiseByPost(body);
        return promise;
    }

    private getPromiseByPost(body: string): Promise<Object> {
        console.log(body);
        const promise = this.http.post(this.getRequestUri(), body).toPromise();
        promise.then(
            (result: any) => {
                if ( result!= null && result!= undefined && result.hasOwnProperty('redirectUrl')) {
                    window.open(result['redirectUrl'], "_self");
                }
            },
            (error: any) => {
                console.log(error);
            }
        );
        return promise;
    }
}
