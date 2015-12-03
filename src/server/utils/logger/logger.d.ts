declare module Logger {

  interface IConfig {
    path?: string;
    filename?: string;
    level?: string;
    short?: boolean;
    default?: string;
  }

  interface ILogItem {
    level: string;
    message: string;
    data: any;
  }

  export interface IConsoleColors {
    level: any;
    message: any;
  }

  class Base {
    _tag: string;
    _levelsMaxLength: number;
    _options: IConfig;

    constructor(tag: string, options?: IConfig);

    shouldLog(outLevel: string): boolean;
    formatHeader(level: string, tag: string): string;
    createLogItem(level: string, message: string, data?: any): ILogItem;
    timestamp(): string;
  }

  class Console {
    constructor(tag: string, options?: IConfig);

    private toConsole(item: ILogItem, colors?: IConsoleColors, force?: boolean): void;
    public out(message: string, data?: any, force?: boolean): void;

    error(message: string, data?: any): void;
    warning(message: string, data?: any): void;
    info(message: string, data?: any): void;
    verbose(message: string, data?: any): void;
    debug(message: string, data?: any): void;
    silly(message: string, data?: any): void;
  }

}