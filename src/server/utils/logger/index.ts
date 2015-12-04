/// <reference path="./logger.d.ts" />
'use strict';

import * as path from 'path';
import * as mkdirp from 'mkdirp';

import { init as initWinston } from './file';
import Console from './console';

let _loggerConfig: Logger.IConfig;

/**
 * Initialize the logger with configuration
 * @param {Logger.IConfig} config Logger specific configuration
 */
export function init(config: Logger.IConfig) {
  let log = new Console('Logger', config );
  log.debug('Logger config: ', config);

  config.path = path.join(__dirname, config.path || './logs');
  config.filename = config.filename || 'logger.log';
  mkdirp.sync(config.path);

  config.default = Console.validLevel(config.default) ? config.default.toUpperCase() : 'INFO';

  let isValidLevel = Console.validLevel(config.level);
  if (!isValidLevel) {
    log.warning('Invalid log level [' + config.level.toUpperCase() + '] defaulting to [' + config.default + ']');
  }
  config.level = isValidLevel ? config.level.toUpperCase() : config.default;

  _loggerConfig = config;
  initWinston(config).then(() => {
    log.info('Initialized logger with level of [' + config.level + ']');
    log.info('Using [' + path.resolve(config.path, config.filename) + ']');
  });


  return Promise.resolve();
}

/**
 * Create a new logger instance, with global options
 * or user supplied options
 * @param {string}  tag Tag for the console
 * @param {IConfig} config  (optional) Configuartion for the logger
 * @return Console logger object
 */
export function create(tag: string, config?: Logger.IConfig): Logger.Console {
  return new Console(tag, config || _loggerConfig);
}