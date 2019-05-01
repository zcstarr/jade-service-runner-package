"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Code generated by @open-rpc/client-generator DO NOT EDIT.
const jayson = __importStar(require("jayson/promise"));
const ajv_1 = __importDefault(require("ajv"));
const lodash_1 = __importDefault(require("lodash"));
const schema_utils_js_1 = require("@open-rpc/schema-utils-js");
class ParameterValidationError extends Error {
    constructor(message, errors) {
        super(message);
        this.message = message;
        this.errors = errors;
    }
}
class ServiceRunner {
    constructor(options) {
        this.methods = [
            {
                "name": "installService",
                "params": [
                    {
                        "name": "serviceName",
                        "schema": {
                            "type": "string",
                        },
                    },
                    {
                        "name": "version",
                        "schema": {
                            "type": "string",
                        },
                    },
                ],
                "result": {
                    "name": "installSuccess",
                    "schema": {
                        "type": "boolean",
                    },
                },
            },
            {
                "name": "listInstalledServices",
                "params": [],
                "result": {
                    "name": "installedServices",
                    "schema": {
                        "type": "array",
                        "items": {
                            "type": "string",
                        },
                    },
                },
            },
            {
                "name": "listRunningServices",
                "params": [],
                "result": {
                    "name": "runningServices",
                    "schema": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "type": {
                                    "type": "array",
                                    "items": {
                                        "anyOf": [
                                            {
                                                "type": "string",
                                                "pattern": "^http$",
                                            },
                                            {
                                                "type": "string",
                                                "pattern": "^https$",
                                            },
                                            {
                                                "type": "string",
                                                "pattern": "^ws$",
                                            },
                                        ],
                                    },
                                },
                            },
                            "host": {
                                "type": "string",
                            },
                            "port": {
                                "type": "integer",
                            },
                            "name": {
                                "type": "string",
                            },
                            "environment": {
                                "type": "string",
                            },
                        },
                    },
                },
            },
            {
                "name": "startService",
                "params": [],
                "result": {
                    "name": "serviceConfig",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "type": {
                                "type": "array",
                                "items": {
                                    "anyOf": [
                                        {
                                            "type": "string",
                                            "pattern": "^http$",
                                        },
                                        {
                                            "type": "string",
                                            "pattern": "^https$",
                                        },
                                        {
                                            "type": "string",
                                            "pattern": "^ws$",
                                        },
                                    ],
                                },
                            },
                            "host": {
                                "type": "string",
                            },
                            "port": {
                                "type": "integer",
                            },
                            "name": {
                                "type": "string",
                            },
                            "environment": {
                                "type": "string",
                            },
                        },
                    },
                },
            },
        ];
        if (options.transport === undefined || options.transport.type === undefined) {
            throw new Error("Invalid constructor params");
        }
        this.rpc = jayson.Client[options.transport.type](options.transport);
        this.validator = new ajv_1.default();
        this.methods.forEach((method) => {
            method.params.forEach((param, i) => {
                return this.validator.addSchema(param.schema, schema_utils_js_1.generateMethodParamId(method, param));
            });
        });
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
    validate(methodName, methodObject, params) {
        return lodash_1.default.chain(methodObject.params)
            .map((param, index) => {
            const idForMethod = schema_utils_js_1.generateMethodParamId(methodObject, param);
            const isValid = this.validator.validate(idForMethod, params[index]);
            if (!isValid) {
                const message = [
                    "Expected param in position ",
                    index,
                    " to match the json schema: ",
                    JSON.stringify(param.schema, undefined, "  "),
                    ". The function received instead ",
                    params[index],
                    ".",
                ].join("");
                const err = new ParameterValidationError(message, this.validator.errors);
                return err;
            }
        })
            .compact()
            .value();
    }
    request(methodName, params) {
        const methodObject = lodash_1.default.find(this.methods, ({ name }) => name === methodName);
        const openRpcMethodValidationErrors = this.validate(methodName, methodObject, params);
        if (openRpcMethodValidationErrors.length > 0) {
            return Promise.reject(openRpcMethodValidationErrors);
        }
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