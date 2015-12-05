/// <reference path="./index.d.ts" />
'use strict';

require('babel-polyfill');

import * as fs from 'fs';
import * as path from 'path';
import { argv as args } from 'yargs';

import Config from './config/index';
import App from './core/app';
import Exit from './core/exit';

import { ExecutionTimer, Uptime } from './utils/execution';
import * as Logger from './utils/logger/index';

let _uptime = new Uptime();

/**
 * POC for now
 */
Exit((exitCode: number) => {
  let log = Logger.create('Report');
  if (exitCode !== 0) {
    log.warning('Server is exiting with a non-zero code [' + exitCode + ']');
  } else {
    log.info('Server is exiting cleanly');
  }
  log.info('Server had been running since [' + _uptime.toString() + ']');
  log.verbose('Server Start [' + _uptime.prettyDate(_uptime.Start) + ']');
  log.verbose('Percise server uptime [' + _uptime.Timer.toString() + ']');
});

/**
 * Load the configuration either from the default path
 * or from the command line
 */
let userConfigPath: string = (args.c || args.config) || path.join(__dirname, '../config.json');
fs.readFile(userConfigPath, (err: any, data: any) => {
  if (err) {
    let log = Logger.create('Init');
    log.error('Config file [' + userConfigPath + '] not found, exiting.');
    process.exit(1);
  }
  let config = Config(JSON.parse(data));
  Logger.init(config.log)
    .then(() => init(<Config.IConfig>config))
    .catch(failed);
});

/**
 * Initialize the server with the configuration
 * @param {Config.IConfig}  config  Merged configuration object
 */
function init(config: Config.IConfig) {
  let log = Logger.create('Init');
  let timer = new ExecutionTimer();

  log.info('Initializing server instance');
  log.debug('Using following config: ', config);

  new App(config)
    .init()
    .then(() => {
      log.info('Server initialized');
      log.info('Initialization time [' + timer.toString() + ']');
    })
    .catch(failed);
}

function failed(err: any) {
  let log = Logger.create('App');
  log.error('Server encountered a problem', err);
  if (err.stack) {
    log.error('Stack:', err.stack);
  }
  process.exit(1);
}
