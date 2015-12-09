'use strict';

import { Router } from 'express';

import Controller from './stuff.controller';
let ctrl = new Controller();

export default class Routes implements Route.Api.IRoute {
  register(router: Router) {
    router
      .route('/stuffs')
      .get(ctrl.all)
      .post(ctrl.create);

    return Promise.resolve();
  }
}