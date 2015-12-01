'use strict';

import * as express from 'express';

export default class Statics {
  private _router: express.Router;

  register(app: express.Application) {
    this._router
      .route('/*')
  }
}

function sendIndex(req: express.Request, res: express.Response) {
  return res.sendFile('');
}