export interface Callback<T> {
    onSuccess(data: T): void;
    onError(): void;
    reportError():void;    

}
export interface Service {
    get(): void;
    post(): void;
}
class ServiceMethod {
    appToken;
    operationSignature;
    arguments;
}
export class HttpService<X> implements Service {
    appName: string = window["appName"];
    serviceMethod: ServiceMethod;
    back: Callback<X>;
    defaultProtocol: string = "";
    base: string = "";


    constructor(m: ServiceMethod, back: Callback<X>, defaultProtocol: string) {
        this.defaultProtocol = defaultProtocol;
        this.base = this.defaultProtocol + "//" + window.location.hostname + ":" + window.location.port
        this.serviceMethod = m;
        this.back = back;
    }
    private getRequestQueryString(): string {
        const queryString = "?isTypeScript=true";
        return queryString;
    }
    private getRequestData(): string {
        const queryString = JSON.stringify(this.serviceMethod);
        return queryString;
    }
    private getRequestUri() {
        if (this.appName === undefined) {
            this.appName = "";
        }
        const url = this.base + this.appName + "/OpInvoke/Op" + this.getRequestQueryString();
        return url;
    }
    get(): void {
        const xhr = new XMLHttpRequest();
        const that = this.back;
        xhr.open('GET', encodeURI(this.getRequestUri()), true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onload = () => {
            if (xhr.status === 200) {

                that.onSuccess(JSON.parse(xhr.responseText));
            }
            else {
                that.onError();
            }
        };
        xhr.send();
    }
    post(): void {
        console.log(this.defaultProtocol,"defaultProtocol")
        console.log("In post");
        const xhr = new XMLHttpRequest();
        const that = this.back;
        const url = encodeURI(this.getRequestUri());
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.onload = () => {
            const responseURL = xhr.responseURL;
            const responseText = xhr.responseText;
    
            if (xhr.status === 200) {
                
                const contentType:string = xhr.getResponseHeader("Content-Type");
                // if ( contentType !== null && contentType.includes("text/html") ) {
                //     console.log(responseURL,"Response Url")
                //     document.open();
                //     document.write(responseText);
                //     document.close();
                //     window.history.pushState({}, "", responseURL);
                // }
                //else
                 if (xhr.responseText !== "") {
                    console.log("On success");
                    that.onSuccess(JSON.parse(xhr.responseText));
                    let resp=JSON.parse(xhr.responseText);
                    if(resp.hasOwnProperty('redirectUrl')){
                        console.log(resp.redirectUrl);
                        window.open(resp.redirectUrl,"_self");
                    }

                }
                else{
                    console.log("report error");
                    that.onError();
                }
    
            }
            else {
                console.log("that on error");
                that.reportError();   
               
            }
    
        };
        xhr.send(this.getRequestData());
    }
}
export function HttpPost<T>(appToken, operationSignature, back: Callback<T>, defaultProtocol: string, ...args) {

    if (!defaultProtocol.endsWith(":")) {
        defaultProtocol = defaultProtocol + ":";
    }

    const serviceMethod: ServiceMethod = new ServiceMethod();
    serviceMethod.appToken = appToken;
    serviceMethod.operationSignature = operationSignature;
    serviceMethod.arguments = [];
    args.forEach(value => {
        serviceMethod.arguments.push(value);
    });
    const httpService: HttpService<T> = new HttpService(serviceMethod, back, defaultProtocol);
    httpService.post();
}