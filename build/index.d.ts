import * as jayson from "jayson/promise";
export declare type TServiceName = string;
export declare type TVersion = string;
export declare type TInstallSuccess = boolean;
export declare type TInstalledServices = string[];
export declare type TRunningServices = Array<{
    type?: Array<string | string | string>;
    [k: string]: any;
}>;
export declare type TName = string;
export declare type TEnvironment = string;
export interface IServiceConfig {
    type?: Array<string | string | string>;
    host?: string;
    port?: number;
    name?: string;
    environment?: string;
    [k: string]: any;
}
export default class Something {
    rpc: jayson.Client;
    private validator;
    private openrpcDocument;
    constructor(options: any);
    /**
     *
     */
    installService(serviceName: TServiceName, version: TVersion): Promise<TInstallSuccess>;
    /**
     *
     */
    listInstalledServices(): Promise<TInstalledServices>;
    /**
     *
     */
    listRunningServices(): Promise<TRunningServices>;
    /**
     *
     */
    startService(name: TName, version: TVersion, environment: TEnvironment): Promise<IServiceConfig>;
    private request;
}
