'use strict';

import express = require('express');
import path = require('path');

import loaderUtil = require('../utils/loader');

export let load = (app: express.Application) => {
  loaderUtil.dirs(__dirname, (err, dirs) => {
    if (err) {
      // Do error
    }
    for (var dir of dirs) {
      app.use(path.parse(dir).base, require(dir));
    }
  });
};
