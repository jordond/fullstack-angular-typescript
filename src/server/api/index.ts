'use strict';

import * as express from 'express';
import * as path from 'path';

import { readDirs } from '../utils/loader';

export let load = (app: express.Application) => {
  readDirs(__dirname, (err, dirs) => {
    if (err) {
      // Do error
    }
    for (var dir of dirs) {
      app.use(path.parse(dir).base, require(dir));
    }
  });
};
