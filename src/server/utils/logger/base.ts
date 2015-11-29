'use strict';

import * as _moment from 'moment';
const moment = (_moment as any).default;

/**
 * Logger.ILoggerOptions
 * Contains the base options used by the logger base class
 */
export interface ILoggerOptions {
  level?: string;
  levels?: string[];
  shorten?: boolean;
  default?: string;
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
    let levels = options.levels || ['VERBOSE', 'DEBUG', 'INFO', 'WARNING', 'ERROR', 'LOG'];

    this._tag = tag;
    this._options.level = options.level || 'LEVEL';
    this._options.levels = options.levels || levels;
    this._options.shorten = options.shorten || false;
    this._options.default = options.default || 'INFO';

    // In case the passed in levels are not all uppercase
    this._options.levels = levels.map((item) => item.toUpperCase());

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
    if (outIdx >= levelIdx && levelIdx !== -1) {
      return true;
    } else if (levelIdx === -1) {
      return outIdx >= this._options.levels.indexOf(this._options.default.toUpperCase());
    }
    return false;
  }

  /**
   * Format the header(level) of the log entry
   * @param {String} level The output level
   * @returns {String}  formatted header
   */
  formatHeader(level: string): string {
    if (this._options.shorten) {
      return '[' + level.charAt(0).toUpperCase() + '] ';
    }
    if (this._levelsMaxLength > level.length) {
      var diff = this._levelsMaxLength - level.length;
      level = level.toUpperCase() + ' '.repeat(diff);
    } else {
      level = level.toUpperCase().slice(0, this._levelsMaxLength);
    }
    return '[' + level + ']';
  }

  timestamp(): string {
    return '[' + moment().format('YY/DD/MM|HH:mm:ss') + ']';
  }

} // End of Base

/**
 * Helpers
 */

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