import { FetchService } from "./fetch.js";

export class HttpServiceInvoker {

    //Create the fetch Object
    fetch = new FetchService();

    //Store the parametes
    parameters;

    //Header
    header;

    //name of the service
    serviceName:string;

    constructor(...args:any[]) {
        this.parameters = args;
    }

    get(path: string) {
        console.log("In get");
        if(this.serviceName==null || this.serviceName==undefined || this.serviceName==''){
            throw new Error("Service Name Must Not Be Empty Or Null");
        }
        if(path.charAt(path.length)=='/'){
            path = this.serviceName + path;
        }else{
            path= "/"+ this.serviceName + path;

        }
        return this.fetch.HttpGet(this.parameters, path, this.header);
    }

    post(path: string) {
        console.log("In post");
        if(this.serviceName==null || this.serviceName==undefined || this.serviceName==''){
            throw new Error("Service Name Must Not Be Empty Or Null");
        }
        if(path.charAt(path.length)=='/'){
            path = this.serviceName + path;
        }else{
            path= "/"+ this.serviceName + path;
        }        
        return this.fetch.HttpPost(this.parameters, path, this.header);
    }

    addHeader(header?: any) {
        this.header = header;
        console.log(header, "Add header");
        return this;
    }

    setServiceName(serviceName:any):HttpServiceInvoker{
            this.serviceName=serviceName;
            console.log(serviceName, "Service Name");
            return this;
    }



}