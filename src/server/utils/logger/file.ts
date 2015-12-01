'use strict';


import { default as Base, ILoggerOptions, ILogItem } from './base';

export default class File extends Base {
  _path: string;
  _filename: string;

  constructor(tag: string, path?: string, options?: ILoggerOptions) {
    super(tag, options);
    this._path = path || './logs';
  }

  log(message: string, data?: any): void {
    let item = this.createLogItem('LOG', message, data);
    this.write(toJson(item));
  }

  error(message: string, data?: any): void {
    let item = this.createLogItem('ERROR', message, data);
    this.write(toJson(item), true);
  }

  warning(message: string, data?: any): void {
    let item = this.createLogItem('WARNING', message, data);
    this.write(toJson(item));
  }

  info(message: string, data?: any): void {
    let item = this.createLogItem('INFO', message, data);
    this.write(toJson(item));
  }

  debug(message: string, data?: any): void {
    let item = this.createLogItem('DEBUG', message, data);
    this.write(toJson(item));
  }

  verbose(message: string, data?: any): void {
    let item = this.createLogItem('VERBOSE', message, data);
    this.write(toJson(item));
  }

  write(json: string, force?: boolean) {

  }
}

/**
 * Convert the Log item into a json object
 * @param {ILogItem}  item  Contents of log object
 * @returns {String}  JSON string of log object
 */
function toJson(item: ILogItem): string {
  let output = {
    date: Date.now(),
    dateFormatted: this.timestamp(),
    item: item
  }
  return JSON.stringify(output);
}