/// <reference path="../../typings/tsd.d.ts" />
'use strict';

require('babel-polyfill');

import { default as Console } from './utils/logger/console';
let log = new Console('App');

log.out('this is a test', { test: 123 }, true);
log.out('this is a test', { test: 123 }, true);
