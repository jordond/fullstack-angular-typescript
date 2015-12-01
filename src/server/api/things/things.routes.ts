'use strict';

import { Router } from 'express';

export default class ThingsRoutes implements Route.IApiRoute {
  init(router: Router) {
    router
      .route('/api/things')
      .get(() => console.log('things get'))
      .post(() => console.log('things post'));
  }
}