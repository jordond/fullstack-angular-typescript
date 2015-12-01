/// <reference path="../../typings/tsd.d.ts" />

declare module Config {
  interface IPaths {
    root: string;
    client: string;
    server: string;
    webDir?: string;
  }

  interface ILoggerConfig {
    path?: string;
    level?: string;
    short?: boolean;
    default?: string;
  }


  interface ISecrets {
    session: string;
  }

  interface IApi {
    root?: string;
    secure?: boolean;
  }

  interface IConfig {
    env?: string;
    paths?: IPaths;
    port?: number;
    log?: ILoggerConfig;
    secrets?: ISecrets;
    api?: IApi;
  }
}

declare module Route {

  module Api {
    interface IRoute {
      register: (router: any) => void;
    }

    interface IController {
      all?: (req: Express.Response, res: Express.Response) => void;
      show?: (req: Express.Response, res: Express.Response) => void;
      create?: (req: Express.Response, res: Express.Response) => void;
      update?: (req: Express.Response, res: Express.Response) => void;
      patch?: (req: Express.Response, res: Express.Response) => void;
      destroy?: (req: Express.Response, res: Express.Response) => void;
    }

    interface IModel {

    }
  }

  interface IRouterError {
    name: string;
    err: any;
  }
}