"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var FetchService = /** @class */ (function () {
    function FetchService() {
        //Service Name.
        this.cfgApiBaseUrl = window['cfgApiBaseUrl'];
        this.http = new http_1.HttpClient(new http_1.HttpXhrBackend({ build: function () { return new XMLHttpRequest(); } }));
    }
    /**
     * @param baseUrl api
     * @param opParamMap parameters
     */
    FetchService.prototype.HttpPost = function (args, path, header) {
        console.log(header);
        var opParamMap = {};
        for (var i = 0; i < args.length; i++) {
            opParamMap[i] = { "value": args[i] };
        }
        console.log(opParamMap, path);
        return this.getPromiseByPost(path, opParamMap, header);
    };
    /**
     *
     * @param baseUrl
     * @param opParamMap
     */
    FetchService.prototype.HttpGet = function (args, path, header) {
        var opParamMap = "";
        var value = args;
        if (value.length != 0 && String(value[0].includes("RESPONSE_TYPE"))) {
            opParamMap = "?" + value[0];
            value.splice(0, 1);
        }
        for (var i = 0; i < value.length; i++) {
            if (i == 0) {
                if (opParamMap != "") {
                    opParamMap += "&" + i + "=" + value[i];
                }
                else {
                    opParamMap = "?" + i + "=" + value[i];
                }
            }
            else {
                opParamMap += "&" + i + "=" + value[i];
            }
        }
        return this.getPromiseByGet(path, opParamMap, header);
        ;
    };
    /**
     * Http post request and return promise
     * @param baseUrl api
     * @param opParamMap parameters
     */
    FetchService.prototype.getPromiseByPost = function (opPath, opParamMap, header) {
        var opUrl = null;
        if (this.cfgApiBaseUrl.charAt(this.cfgApiBaseUrl.length - 1) == '/') {
            opUrl = this.cfgApiBaseUrl + "Op";
        }
        else {
            opUrl = this.cfgApiBaseUrl + "/Op";
        }
        var promise = this.http.post(opUrl + opPath, opParamMap, header).toPromise();
        promise.then(function (result) {
            if (result != null && result != undefined && result.hasOwnProperty('redirectUrl')) {
                window.open(result['redirectUrl'], "_self");
            }
        }, function (error) {
            console.log(error);
        });
        return promise;
    };
    /**
     * Http get request and return promise
     * @param baseUrl api
     * @param opParamMap parameters
     */
    FetchService.prototype.getPromiseByGet = function (opPath, opParamMap, header) {
        var opUrl = null;
        if (this.cfgApiBaseUrl.charAt(this.cfgApiBaseUrl.length) == '/') {
            opUrl = this.cfgApiBaseUrl + "Op";
        }
        else {
            opUrl = this.cfgApiBaseUrl + "/Op";
        }
        var promise = this.http.get(opUrl + opPath + opParamMap, header).toPromise();
        promise.then(function (result) {
            console.log(result);
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
