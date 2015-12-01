/// <reference path="./index.d.ts" />
'use strict';

require('babel-polyfill');

import * as fs from 'fs';
import * as path from 'path';
import { argv as args } from 'yargs';

import Config from './config/index';
import App from './core/app';

import Logger from './utils/logger/console';
let log = new Logger('App', { level: 'VERBOSE' });

/**
 * Load the configuration either from the default path
 * or from the command line
 */

let userConfigPath: string = (args.c || args.config) || path.join(__dirname, '../config.json');
fs.readFile(userConfigPath, (err: any, data: any) => {
  if (err) {
    log.error('Config file [' + userConfigPath + '] not found, exiting.');
    process.exit(1);
  }
  let config = Config(JSON.parse(data));
  init(<Config.IConfig>config);
});

/**
 * Initialize the server with the configuration
 * @param {Config.IConfig}  config  Merged configuration object
 */
function init(config: Config.IConfig) {
  new App(config)
    .init()
    .then(() => log.info('Server initialized'))
    .catch((err: any) => log.error('Server init failed', err));
}
