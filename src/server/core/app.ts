'use strict';

import * as _express from 'express';
const express = (_express as any).default;

import Routes from './routes';

export default class App {
  _app: _express.Application;
  _config: Config.IConfig;

  constructor(config: Config.IConfig) {
    this._config = config;
    this._app = express();
  }

  init() {
    let _promise = (resolve: Function, reject: Function) => {
      let components = [
        Routes.init(this._app, express.Router())
      ];

      Promise
        .all(components)
        .then(() => resolve())
        .catch((err) => reject(err));
    };
    return new Promise(_promise);
  }
}

// function init(config) {

  // Init database
  // Database.init(config);

  // Init express

  // Init routes

  // Init sockets

// }