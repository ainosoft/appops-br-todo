"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fetch_js_1 = require("./fetch.js");
var HttpServiceInvoker = /** @class */ (function () {
    function HttpServiceInvoker() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //Create the fetch Object
        this.fetch = new fetch_js_1.FetchService();
        this.parameters = args;
    }
    HttpServiceInvoker.prototype.get = function (path) {
        console.log("In get");
        if (this.serviceName == null || this.serviceName == undefined || this.serviceName == '') {
            throw new Error("Service Name Must Not Be Empty Or Null");
        }
        if (path.charAt(path.length) == '/') {
            path = this.serviceName + path;
        }
        else {
            path = "/" + this.serviceName + path;
        }
        return this.fetch.HttpGet(this.parameters, path, this.header);
    };
    HttpServiceInvoker.prototype.post = function (path) {
        console.log("In post");
        if (this.serviceName == null || this.serviceName == undefined || this.serviceName == '') {
            throw new Error("Service Name Must Not Be Empty Or Null");
        }
        if (path.charAt(path.length) == '/') {
            path = this.serviceName + path;
        }
        else {
            path = "/" + this.serviceName + path;
        }
        return this.fetch.HttpPost(this.parameters, path, this.header);
    };
    HttpServiceInvoker.prototype.addHeader = function (header) {
        this.header = header;
        console.log(header, "Add header");
        return this;
    };
    HttpServiceInvoker.prototype.setServiceName = function (serviceName) {
        this.serviceName = serviceName;
        console.log(serviceName, "Service Name");
        return this;
    };
    return HttpServiceInvoker;
}());
exports.HttpServiceInvoker = HttpServiceInvoker;
