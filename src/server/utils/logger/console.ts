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

  /**
   * Do the heavy lifting and output the item to the console
   * @param {IConsoleItem}    item    Object containing console info
   * @param {IConsoleColors}  colors  output using chalk colors
   * @param {Boolean}         force (optional) always output to console
   */
  private toConsole(item: IConsoleItem, colors?: IConsoleColors, force?: boolean): void {
    if (this.shouldLog(item.level) || force) {
      let header: string = this.formatHeader(item.level, this.tag);
      item.data = item.data || '';
      if (colors === null) {
        console.log(chalk.gray(this.timestamp()) + header + ' ' + item.message, item.data);
      } else {
        console.log(chalk.gray(this.timestamp())
          + colors.level(header)
          + colors.message(' ' + item.message), item.data);
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

  /**
   * Lowest level of logging outputs as green
   * @param {string}  message Content to output
   * @param {any}     data    Extra info to pass to console
   */
  log(message: string, data?: any): void {
    let colors = createColor(chalk.green);
    this.toConsole(createConsoleItem('LOG', message, data), colors);
  }

  /**
   * When something has gone wrong
   * Always pass 'true' to {this.toConsole}, so that it is always outputted
   * @param {string}  message Content to output
   * @param {any}     data    Extra info to pass to console
   */
  error(message: string, data?: any): void {
    let colors = createColor(chalk.bold.bgRed, chalk.bold.red);
    this.toConsole(createConsoleItem('ERROR', message, data), colors, true);
  }

  /**
   * Something is not acceptable, but not desired
   * @param {string}  message Content to output
   * @param {any}     data    Extra info to pass to console
   */
  warning(message: string, data?: any): void {
    let colors = createColor(chalk.bold.bgYellow, chalk.bold.yellow);
    this.toConsole(createConsoleItem('WARNING', message, data), colors);
  }

  /**
   * Not necessary information, but still nice to see
   * @param {string}  message Content to output
   * @param {any}     data    Extra info to pass to console
   */
  info(message: string, data?: any): void {
    let colors = createColor(chalk.cyan);
    this.toConsole(createConsoleItem('INFO', message, data), colors);
  }

  /**
   * Non-important information
   * @param {string}  message Content to output
   * @param {any}     data    Extra info to pass to console
   */
  debug(message: string, data?: any): void {
    let colors = createColor(chalk.magenta);
    this.toConsole(createConsoleItem('DEBUG', message, data), colors);
  }

  /**
   * Highest level of verbosity, has the most output
   * @param {string}  message Content to output
   * @param {any}     data    Extra info to pass to console
   */
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