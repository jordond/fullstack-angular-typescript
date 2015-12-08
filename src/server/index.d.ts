/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="./utils/logger/logger.d.ts" />

declare module Config {
  interface IPaths {
    root: string;
    client: string;
    server: string;
    dataDir?: string;
    webDir?: string;
  }

  interface ISecrets {
    session: string;
  }

  interface IApi {
    root?: string;
    secure?: boolean;
  }

  interface IEnvironment {
    valid?: string[];
    default?: string;
    environment?: string;
  }

  interface ISocket {
    path: string;
    serveClient?: boolean;
  }

  interface IDatabase {
    name?: string;
    username?: string;
    password?: string;
    filename?: string;
  }

  interface IConfig {
    env?: IEnvironment;
    paths?: IPaths;
    port?: number;
    log?: Logger.IConfig;
    secrets?: ISecrets;
    api?: IApi;
    socket?: ISocket;
    database?: IDatabase;
  }
}

declare module Core {
  interface Component {
    init(app: any, config: Config.IConfig): Promise<void> | Promise<{}>;
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
      name: string;
      schema: any;
      methods?: {
        classMethods?: Function;
        instanceMethods?: Function;
      };
    }
  }

  interface IRouterError {
    name: string;
    err: any;
  }
}