'use strict';

var moment = require('moment');

/**
 * Logger.ILoggerOptions
 * Contains the base options used by the logger base class
 */
interface ILoggerOptions {
  level: string;
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
  private _options: ILoggerOptions = {
    levels: ['VERBOSE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'LOG'],
    level: 'INFO',
    shorten: false,
    default: 'INFO'
  };

  constructor(tag: string, options?: ILoggerOptions) {
    this._tag = tag;
    if (typeof options !== 'undefined') {
      this._options = Object.assign(this._options, options);
      this._options.levels = Array.prototype.map((item) => item.toUpperCase());
    }
    this._levelsMaxLength = levelsLength(this._options.levels).length;
  }

  get tag() {
    return this._tag;
  }

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
      return '[' + level.charAt(0).toUpperCase() + ']';
    }
    if (this._levelsMaxLength > level.length) {
      var diff = this._levelsMaxLength - level.length;
      level = level.toUpperCase() + ' '.repeat(diff + 1);
    } else {
      level = level.toUpperCase().slice(0, this._levelsMaxLength - 1);
    }
    return level;
  }

  timestamp(): string {
    return '[' + moment().format('YYYY/DD/MM HH:mm:ss') + ']';
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