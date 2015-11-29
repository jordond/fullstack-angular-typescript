/// <reference path="../../typings/tsd.d.ts" />
'use strict';

require('babel-polyfill');

import * as fs from 'fs';
import * as path from 'path';
import { argv as args } from 'yargs';

import Config from './config';

import Logger from './utils/logger/console';
let log = new Logger('App', { level: 'VERBOSE' });

let userConfigPath: string = (args.c || args.config) || path.join(__dirname, '../config.json');
fs.readFile(userConfigPath, (err: any, data: any) => {
  if (err) {
    log.error('Config file [' + userConfigPath + '] not found, exiting.');
    process.exit(1);
  }
  let config = Config(JSON.parse(data));
  init(config);
});

function init(config: any) {
  log.info('supposed to be config: ', config);
  log.log('test message', { some: 'data' });
  log.error('test message', { some: 'data' });
  log.warning('test message', { some: 'data' });
  log.info('test message', { some: 'data' });
  log.debug('test message', { some: 'data' });
  log.verbose('test message', { some: 'data' });
  log.out('test message', { some: 'data' }, true);

  log.info('Server initialized');
}

