/// <reference path="../../../typings/tsd.d.ts" />
import express = require('express');

import Api = require('../api');

export class Routes {
  private _app: express.Application;
  constructor(app: express.Application) {
    this._app = app;
  }
  all() {
    this.core();
    this.api();
  }
  core() {
    load(this._app);
  }
  api() {
    Api.load(this._app);
  }
}

/**
 * Core routes
 */

function load(app: express.Application) : void {
  // Core app routes go here
}