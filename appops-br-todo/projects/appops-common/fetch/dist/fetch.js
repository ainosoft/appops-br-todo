"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ServiceMethod = /** @class */ (function () {
    function ServiceMethod() {
    }
    return ServiceMethod;
}());
var FetchService = /** @class */ (function () {
    function FetchService(http) {
        this.http = http;
        this.appName = window["appName"];
    }
    FetchService.prototype.getRequestQueryString = function () {
        var queryString = "?isTypeScript=true";
        return queryString;
    };
    FetchService.prototype.getRequestData = function () {
        var queryString = JSON.stringify(this.serviceMethod);
        return queryString;
    };
    FetchService.prototype.getRequestUri = function () {
        var baseUrl = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
        if (this.appName === undefined || this.appName === null || this.appName === '') {
            var url = baseUrl + "/OpInvoke/Op" + this.getRequestQueryString();
            console.log(url);
            return url;
        }
        else {
            var url = baseUrl + this.appName + "/OpInvoke/Op" + this.getRequestQueryString();
            console.log(url);
            return url;
        }
    };
    FetchService.prototype.HttpPost = function (appToken, operationSignature) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var serviceMethod = new ServiceMethod();
        serviceMethod.appToken = appToken;
        serviceMethod.operationSignature = operationSignature;
        serviceMethod.arguments = [];
        args.forEach(function (value) {
            serviceMethod.arguments.push(value);
        });
        this.serviceMethod = serviceMethod;
        var body = this.getRequestData();
        var promise = this.getPromiseByPost(body);
        return promise;
    };
    FetchService.prototype.getPromiseByPost = function (body) {
        console.log(body);
        var promise = this.http.post(this.getRequestUri(), body).toPromise();
        promise.then(function (result) {
            if (result != null && result != undefined && result.hasOwnProperty('redirectUrl')) {
                window.open(result['redirectUrl'], "_self");
            }
        }, function (error) {
            console.log(error);
        });
        return promise;
    };
    FetchService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], FetchService);
    return FetchService;
}());
exports.FetchService = FetchService;
