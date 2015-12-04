'use strict';

import * as express from 'express';

import { create } from '../../utils/logger/index';
import Api from '../../routes/api/index';
import Statics from '../../routes/static/index';

let _log: Logger.Console;

export default class Routes implements Core.Component {
  /**
   * Initialize the Router component
   * Load all api routes and then setup
   * the static and other routes
   * @param {Express.Application} app     Express server instance
   * @param {Express.Router}      router  Express router object
   * @returns {Promise} resolve when all routes are loaded
   */
  init(app: any, config: Config.IConfig) {
    let _router = express.Router();
    _log = create('Routes');
    _log.info('Registering [Api, Statics] components');

    let api = new Api(config.api.root);
    let statics = new Statics(config.paths.client);

    let chain = api.register(app)
      .then((name: string) => {
        onRegistered(name);
        return statics.register(app);
      })
      .then((name: string) => {
        onRegistered(name);
      })
      .catch(registerErrorHandler);

    return chain
      .then(() => _log.info('Finished registering all route components'));
  }
}

/**
 * Called when an route has finished registering
 * @param {String}  name  Name of the route
 */
function onRegistered(name: string) {
  // TODO handle this?
  _log.verbose('Finished registering [' + name + ']');
}

/**
 * Handle any errors that happen when registering routes.
 * Log the error event name, then throw the error so that
 * the promise gets rejected
 * @param {Route.IRouterError} err  Contains all the error information
 * @throws {Object} Error object from exception
 */
function registerErrorHandler(err: Route.IRouterError) {
  _log.error('Error register route [' + err.name + ']', err);
  throw err;
}
