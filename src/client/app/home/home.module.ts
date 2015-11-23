'use strict';

/**
 * Module app.home
 * Main entry point for the user
 */

import routes from './home.routes';

let dependencies: string[] = [];

let mod =
  angular
    .module('app.home', dependencies)
    .config(routes);

export default mod.name;