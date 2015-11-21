'use strict';

// TODO temp fix until typescript issue is fixed
import * as _chalk from 'chalk';
const chalk = (_chalk as any).default;

import { default as Base, ILoggerOptions } from './base';

/**
 * Logger.Console.IConsoleItem
 * Contains the elements that make up a console output
 */
export interface IConsoleItem {
  level: string;
  message: string;
  data: any;
}

/**
 * Logger.Console.IConsoleColors
 * Contains the colors for the console output
 */
export interface IConsoleColors {
  level: any;
  message: any;
}

/**
 * Logger.Console
 * Inherits from Logger.Base
 * Handles the outputting of information to the console
 */
export default class Console extends Base {
  constructor(tag: string, options?: ILoggerOptions) {
    super(tag, options);
  }

  private toConsole(item: IConsoleItem, colors?: IConsoleColors, force?: boolean): void {
    if (this.shouldLog(item.level) || force) {
      item.level = this.formatHeader(item.level);
      item.data = item.data || '';
      if (colors === null) {
        console.log(chalk.gray(this.timestamp()) + item.level + this.tag + item.message, item.data);
      } else {
        console.log(chalk.gray(this.timestamp())
          + colors.level(item.level)
          + colors.message(this.tag + item.message), item.data);
      }
    }
  }

  /**
   * Custom log level with option to force outputting if it is
   * not in the list of acceptable levels
   * @param {string}  message  message to output
   * @param {data}    data  (optional) extra data to output
   * @param {boolean} force (optional) force output, default true
   */
  public out(message: string, data?: any, force?: boolean): void {
    if (typeof force === 'undefined') {
      force = true;
    }
    let item = { level: 'LOG', message: message, data: data };
    this.toConsole(item, null, force);
  }

  log(message: string, data?: any): void {
    let colors = createColor(chalk.green);
    this.toConsole(createConsoleItem('LOG', message, data), colors);
  }

  error(message: string, data?: any): void {
    let colors = createColor(chalk.bold.bgRed, chalk.bold.red);
    this.toConsole(createConsoleItem('ERROR', message, data), colors);
  }

  warning(message: string, data?: any): void {
    let colors = createColor(chalk.bold.bgYellow, chalk.bold.yellow);
    this.toConsole(createConsoleItem('WARNING', message, data), colors);
  }

  info(message: string, data?: any): void {
    let colors = createColor(chalk.cyan);
    this.toConsole(createConsoleItem('INFO', message, data), colors);
  }

  debug(message: string, data?: any): void {
    let colors = createColor(chalk.magenta);
    this.toConsole(createConsoleItem('DEBUG', message, data), colors);
  }

  verbose(message: string, data?: any): void {
    let colors = createColor(chalk.gray);
    this.toConsole(createConsoleItem('VERBOSE', message, data), colors);
  }

} // End of Logger.Console

/**
 * Private Helpers
 */

/**
 * Implement the IConsoleItem interface
 * @param {string}  level desired output level
 * @param {string}  message contents of log item
 * @param {Object}  data (optional) additional data to output to console
 * @returns {IConsoleItem} container holding level, message and data
 */
function createConsoleItem(level: string, message: string, data?: any): IConsoleItem {
  return {
    level: level,
    message: message,
    data: data || ''
  };
}

/**
 * Implements the IConsoleColors interface
 * @param {Chalk.ChalkStyle}  level Chalk color object for level
 * @param {Chalk.ChalkStyle}  message (optional) color object for message
 * @returns {IConsoleColors}  container of color objects
 */
function createColor(level: any, message?: any): IConsoleColors {
  return {
    level: level,
    message: message || level
  };
}