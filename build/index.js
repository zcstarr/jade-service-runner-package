"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Code generated by @open-rpc/client-generator DO NOT EDIT.
// @ts-ignore
const browser_1 = __importDefault(require("jayson/lib/client/browser"));
const lodash_1 = __importDefault(require("lodash"));
// import { MethodCallValidator } from "@open-rpc/schema-utils-js";
// @ts-ignore
const callServer = (request, callback) => {
    const options = {
        method: "POST",
        body: request,
        headers: {
            "Content-Type": "application/json",
        },
    };
    fetch("http://localhost:8002", options)
        .then((res) => res.text())
        .then((text) => callback(null, text))
        .catch((err) => callback(err));
};
class ServiceRunner {
    constructor(options) {
        this.openrpcDocument = { "info": { "title": "something", "version": "44" }, "methods": [{ "name": "installService", "params": [{ "name": "serviceName", "schema": { "type": "string" } }, { "name": "version", "schema": { "type": "string" } }], "result": { "name": "installSuccess", "schema": { "type": "boolean" } } }, { "name": "listInstalledServices", "params": [], "result": { "name": "installedServices", "schema": { "type": "array", "items": { "type": "string" } } } }, { "name": "listRunningServices", "params": [], "result": { "name": "runningServices", "schema": { "type": "array", "items": { "type": "object", "properties": { "type": { "type": "array", "items": { "anyOf": [{ "type": "string", "pattern": "^http$" }, { "type": "string", "pattern": "^https$" }, { "type": "string", "pattern": "^ws$" }] } } }, "host": { "type": "string" }, "port": { "type": "integer" }, "name": { "type": "string" }, "environment": { "type": "string" } } } } }, { "name": "startService", "params": [], "result": { "name": "serviceConfig", "schema": { "type": "object", "properties": { "type": { "type": "array", "items": { "anyOf": [{ "type": "string", "pattern": "^http$" }, { "type": "string", "pattern": "^https$" }, { "type": "string", "pattern": "^ws$" }] } }, "host": { "type": "string" }, "port": { "type": "integer" }, "name": { "type": "string" }, "environment": { "type": "string" } } } } }], "openrpc": "1.0.0-rc0" };
        if (options.transport === undefined || options.transport.type === undefined) {
            throw new Error("Invalid constructor params");
        }
        this.rpc = browser_1.default(callServer, options.transport);
        // this.validator = new MethodCallValidator(this.openrpcDocument);
    }
    /**
     *
     */
    installService(serviceName, version) {
        return this.request("installService", Array.from(arguments));
    }
    /**
     *
     */
    listInstalledServices() {
        return this.request("listInstalledServices", Array.from(arguments));
    }
    /**
     *
     */
    listRunningServices() {
        return this.request("listRunningServices", Array.from(arguments));
    }
    /**
     *
     */
    startService() {
        return this.request("startService", Array.from(arguments));
    }
    request(methodName, params) {
        const methodObject = lodash_1.default.find(this.openrpcDocument.methods, ({ name }) => name === methodName);
        /*const openRpcMethodValidationErrors = this.validator.validate(methodName, params);
        if (openRpcMethodValidationErrors.length > 0) {
          return Promise.reject(openRpcMethodValidationErrors);
          }*/
        let rpcParams;
        if (methodObject.paramStructure && methodObject.paramStructure === "by-name") {
            rpcParams = lodash_1.default.zipObject(params, lodash_1.default.map(methodObject.params, "name"));
        }
        else {
            rpcParams = params;
        }
        const result = this.rpc.request(methodName, rpcParams);
        return result.then((r) => r.result);
    }
}
exports.default = ServiceRunner;
//# sourceMappingURL=index.js.map