'use strict';

import * as _express from 'express';
const express = (_express as any).default;

import Routes from './routes';

/**
 * Main server bootstrapper
 * Houses the server app instance and configuration
 * Will initialize all the components of the server
 */
export default class App {
  _app: _express.Application;
  _config: Config.IConfig;

  /**
   * Create a new app object
   * @param {Config.IConfig}  config  Main configuartion file which contains all of the application configuartion
   */
  constructor(config: Config.IConfig) {
    this._config = config;
    this._app = express();
  }

  /**
   * Initialize all the different components of the server
   * House all the promises in {componentPromises} and when
   * all of the promises have been resolved, then resolve the
   * final promise to inform of server initialization.
   */
  init() {
    let _promise = (resolve: Function, reject: Function) => {
      let componentPromises = [
        Routes.init(this._app, express.Router())
      ];

      Promise
        .all(componentPromises)
        .then(() => resolve())
        .catch((err) => reject(err));
    };
    return new Promise(_promise);
  }
}