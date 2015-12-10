'use strict';

/**
 * Import endpoints, should contain
 * Name, Model, Routes, Socket
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