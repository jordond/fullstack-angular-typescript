'use strict';

import apiRoutes from '../api';

export default class Routes {
  /**
   * Initialize the Router component
   * Load all api routes and then setup
   * the static and other routes
   * @param {Express.Application} app     Express server instance
   * @param {Express.Router}      router  Express router object
   * @returns {Promise} resolve when all routes are loaded
   */
  static init(app: any, router: any) {
    var _promise = (resolve: Function, reject: Function ) => {
      for (let route of apiRoutes) {
        new route().init(router);
      }

      // Add all routes to the application
      app.use('/', router);
      resolve();
    };

    return new Promise(_promise);
  }
}