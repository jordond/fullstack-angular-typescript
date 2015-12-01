'use strict';

import { Router } from 'express';

import Things from '../api/things/things.routes';
import Stuff from '../api/stuff/stuff.routes';

let routes: any[] = [
  Things,
  Stuff
];

export default class Routes {
  static init(app: Express.Application, router: Router) {
    var _promise = (resolve: Function, reject: Function ) => {
      for (let route of routes) {
        route.init(router);
      }
      resolve();
    };

    return new Promise(_promise);
  }
}