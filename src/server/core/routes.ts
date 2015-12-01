'use strict';

import * as express from 'express';

import Api from '../routes/api/index';

export default class Routes {
  /**
   * Initialize the Router component
   * Load all api routes and then setup
   * the static and other routes
   * @param {Express.Application} app     Express server instance
   * @param {Express.Router}      router  Express router object
   * @returns {Promise} resolve when all routes are loaded
   */
  static init(app: any, config: Config.IConfig) {
    let _router = express.Router();

    // Register all api endpoints
    let api = new Api(config.api.root)
      .register(app)
      .then(() => console.log('Finished API Registration '));

    // Register auth routes

    // Register static routes

    return Promise
      .all([api])
      .then(() => console.log('all routes registered'))
      .catch(registerErrorHandler);
  }
}

/**
 * Handle any errors that happen when registering routes.
 * Log the error event name, then throw the error so that
 * the promise gets rejected
 * @param {Route.IRouterError} err  Contains all the error information
 * @throws {Object} Error object from exception
 */
function registerErrorHandler(err: Route.IRouterError) {
  console.log('Error register route [' + err.name + ']');
  throw err;
}