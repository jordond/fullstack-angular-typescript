'use strict';

import * as _express from 'express';
const express = (_express as any).default;

import { create } from '../utils/logger/index';
import Routes from './components/routes';
import Express from './components/express';

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
   * @return {Promise<void>}  Thenable promise
   */
  init() {
    let log = create('App');
    this._app.set('env', getEnvironment(this._config.env));
    // Create the boostrap promise
    let _promise = (resolve: Function, reject: Function) => {

      // Initialize app components and store promises
      let routes = new Routes().init(this._app, this._config);
      let express = new Express()
        .init(this._app, this._config)
        .then((server: any) => {
          // setup socket server
          // socket.init(app, config, server)?
          // or .then(socket.init) - have express.init resolve app, config, server?
        });

      // Wait for all the component promises to resolve
      Promise
        .all([routes, express])
        .then(() => {
          log.info('Server bootstrapping has been completed');
          resolve();
        })
        .catch((err) => reject(err));
    };

    return new Promise(_promise);
  }
}

/**
 * Get the application environment, then check to make sure it is
 * a valid environment.  If not assign the default development env
 * @param {Config.IEnvironment} config  Enviroment configuation object
 * @return {string} Applications environment
 */
function getEnvironment(config: Config.IEnvironment): string {
  let env = config.environment || process.env.NODE_ENV;
  return config.valid.indexOf(env) !== -1 ? env : config.default;
}