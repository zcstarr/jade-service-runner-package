export declare type TServiceName = string;
export declare type TVersion = string;
export declare type TInstallSuccess = boolean;
export declare type TInstalledServices = string[];
export declare type TRunningServices = Array<{
    type?: Array<string | string | string>;
    [k: string]: any;
}>;
export interface IServiceConfig {
    type?: Array<string | string | string>;
    host?: string;
    port?: number;
    name?: string;
    environment?: string;
    [k: string]: any;
}
export default class ServiceRunner {
    rpc: any;
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
    startService(): Promise<IServiceConfig>;
    private request;
}
