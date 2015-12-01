'use strict';

import * as fs from 'fs';

import { default as Base, ILoggerOptions } from './base';
import Console from './console';
import File from './file';

let _config: Config.ILoggerConfig;
let _log: Console;

export function init(config: Config.ILoggerConfig): void {
  _log = new Console('Logger');
  _config = config;
  _config.path = _config.path || './logs';
  if (createLogDir(_config.path)) {
    _log.log('Using [' + _config.path + '] for log files');
  }
}

class Logger {
  _console: Console;
  _file: File;

  constructor(tag: string, options?: ILoggerOptions) {
    this._console = new Console(tag, options);
    this._file = new File(tag, _config.path, options);
  }

  get console() {
    return this._console;
  }

  get file() {
    return this._file;
  }
}

export default Logger;

function createLogDir(path: string): boolean {
  try {
    if (!fs.statSync(path)) {
      fs.mkdirSync(path);
    }
    return !!fs.statSync(path);
  } catch (err) {
    _log.error('Could not create log directory [' + path + ']', err);
    return false
  }
}