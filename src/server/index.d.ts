/// <reference path="../../typings/tsd.d.ts" />

declare module Config {
  interface ILoggerConfig {
    path?: string;
    level?: string;
    short?: boolean;
    default?: string;
  }

  interface ISecrets {
    session: string;
  }

  interface IConfig {
    env?: string;
    paths?: any;
    port?: number;
    log?: ILoggerConfig;
    secrets?: ISecrets;
  }
}

declare module Route {
  interface IApiRoute {
    init: (router: any) => void;
  }
}