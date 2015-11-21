'use strict';

import * as express from 'express';
import * as path from 'path';

import * as loader from '../utils/loader/index';
import Logger from '../utils/logger/console';
let log = new Logger('API');

export let load = (app: express.Application) => {
  loader.readDirs(__dirname, (err, dirs) => {
    if (err) {
      // Do error
    }
    for (var dir of dirs) {
      app.use(path.parse(dir).base, require(dir));
    }
  });
};
