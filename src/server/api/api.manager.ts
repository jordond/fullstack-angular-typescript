'use strict';

import * as express from 'express';
import * as path from 'path';

export const API_BASE: string = '/api/';

export interface IRouteCallback {
  (req: express.Request, res: express.Response, next: any): void;
}

export interface IRoute {
  path: string;
  method: IRouteCallback;
}

export interface IController {
  all?: IRoute;
  create?: IRoute;
  read?: IRoute;
  update?: IRoute;
  destroy?: IRoute;
}