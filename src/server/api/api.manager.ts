import express = require('express');
import path = require('path');

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