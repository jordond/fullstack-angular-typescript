'use strict';

import { Router } from 'express';

export default class ThingsRoutes {
  static init(router: Router) {
    router
      .route('/api/things')
      .get(() => console.log('things get'))
      .post(() => console.log('things post'));
  }
}