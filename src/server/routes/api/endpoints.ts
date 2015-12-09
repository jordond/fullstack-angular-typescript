'use strict';

/**
 * Import the api routes, then add them to
 * the {routes: any[]} array.  Make sure your Route
 * class has an {init()} property
 */

// ===========================================

import Things from './things/index';
import Stuff from './stuff/index';

let routes: Route.Api.IEndpoint[] = [
  Things,
  Stuff
];

// ===========================================

export default routes;