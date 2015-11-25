/// <reference path="../../typings/tsd.d.ts" />
'use strict';

import { install } from 'source-map-support';
install();
require('babel-polyfill');

import Logger from './utils/logger/console';
let log = new Logger('App', { level: 'VERBOSE' });

log.log('test message', { some: 'data' });
log.error('test message', { some: 'data' });
log.warning('test message', { some: 'data' });
log.info('test message', { some: 'data' });
log.debug('test message', { some: 'data' });
log.verbose('test message', { some: 'data' });
log.out('test message', { some: 'data' }, true);
