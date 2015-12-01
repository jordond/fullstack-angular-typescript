'use strict';

import { Router } from 'express';

export default class StuffRoutes implements Route.IApiRoute {
  init(router: Router) {
    router
      .route('/api/stuff')
      .get(() => console.log('stuff get'))
      .post(() => console.log('stuff post'));
  }
}