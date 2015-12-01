'use strict';

/**
 * Import the api routes, then add them to
 * the {routes: any[]} array.  Make sure your Route
 * class has an {init()} property
 */

// ===========================================

import Things from './things/things.routes';
import Stuff from './stuff/stuff.routes';

let routes: any[] = [
  Things,
  Stuff
];

// ===========================================

export default routes;