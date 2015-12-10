'use strict';

import { Router } from 'express';

import Controller from './stuff.controller';

export default class Routes implements Route.Api.IRoute {
  register(router: Router) {
    let ctrl = new Controller();

    router
      .route('/stuffs')
      .get(ctrl.all)
      .post(ctrl.create);

    return Promise.resolve();
  }
}