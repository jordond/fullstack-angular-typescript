'use strict';

import * as express from 'express';

import * as Api from '../api';

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