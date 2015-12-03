'use strict';

import * as _moment from 'moment';
const moment = (_moment as any).default;

/**
 * Logger.ILoggerOptions
 * Contains the base options used by the logger base class
 */
export interface ILoggerOptions {
  type?: string;
  level?: string;
  levels?: string[];
  shorten?: boolean;
  default?: string;
}

/**
 * Logger.ILogItem
 * Contains the elements that make up a console output
 */
export interface ILogItem {
  level: string;
  message: string;
  data: any;
}

/**
 * Logger.Base
 * Base class to handle all the setup required for the logger class
 * Including setting the tag name, and handling the settings and log levels
 */
export default class Base {

  private _tag: string;
  private _levelsMaxLength: number;
  private _options: ILoggerOptions = {};

  constructor(tag: string, options?: ILoggerOptions) {
    options = options || {};
    let levels = ['ERROR', 'WARN', 'INFO', 'VERBOSE', 'DEBUG', 'SILLY'];

    this._tag = tag;
    this._options.level = options.level || 'INFO';
    this._options.levels = levels;
    this._options.shorten = options.shorten || false;
    this._options.default = options.default || 'INFO';

    this._levelsMaxLength = levelsLength(this._options.levels).length;
  }

  /**
   * Get logger tag
   * @returns {string} tag for the logger object
   */
  get tag() {
    return this._tag;
  }

  /**
   * Set a new logger tag
   * @params {string} newTag  new tag for logger
   */
  set tag(newTag: string) {
    this._tag = newTag;
  }

  /**
   * Determines whether or not the logger should log the message,
   * depending by the current log level set by the constructor
   * @param {string} outLevel The level of the console item
   * @return {boolean} whether or not to output
   */
  shouldLog(outLevel: string): boolean {
    outLevel = outLevel.trim().toUpperCase();
    let level: string = this._options.level.toUpperCase();
    let levelIdx: number = this._options.levels.indexOf(level);
    let outIdx: number = this._options.levels.indexOf(outLevel);
    if (levelIdx >= outIdx && levelIdx !== -1) {
      return true;
    } else if (levelIdx === -1) {
      return outIdx >= this._options.levels.indexOf(this._options.default.toUpperCase());
    }
    return false;
  }

  /**
   * Format the header(level) of the log entry
   * @param {String}  level The output level
   * @param {String}  tag   caller of the log
   * @returns {String}  formatted header
   */
  formatHeader(level: string, tag: string): string {
    if (this._options.shorten) {
      level = level.charAt(0).toUpperCase();
    } else if (this._levelsMaxLength > level.length) {
      var diff = this._levelsMaxLength - level.length;
      level = level.toUpperCase() + ' '.repeat(diff);
    } else {
      level = level.toUpperCase().slice(0, this._levelsMaxLength);
    }
    return '[' + level + '][' + tag + ']';
  }

  /**
  * Implement the ILogItem interface
  * @param {string}  level desired output level
  * @param {string}  message contents of log item
  * @param {Object}  data (optional) additional data to output to console
  * @returns {ILogItem} container holding level, message and data
  */
  createLogItem(level: string, message: string, data?: any): ILogItem {
    return {
      level: level,
      message: message,
      data: data || ''
    };
  }

  timestamp(): string {
    return '[' + moment().format('YY/DD/MM|HH:mm:ss') + ']';
  }

} // End of Base

/**
 * Get the longest level in the array of levels
 * @param {string[]} a array to calculate
 * @returns {string} longest element
 */
function levelsLength(a: string[]): string {
  var c = 0, d = 0, l = 0, i = a.length;
  if (i) {
    while (i--) {
      d = a[i].length;
      if (d > c) {
        l = i; c = d;
      }
    }
  }
  return a[l];
}