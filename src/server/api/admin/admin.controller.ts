'use strict';

import * as Api from '../api.manager';

let all: Api.IRoute = {
  path: '/',
  method: (req, res) => {
    let test: string[] = ['test', '123', 'ddd'];
    res.status(200).json(test);
  }
};

let create: Api.IRoute = {
  path: '/',
  method: (req, res) => {
    let test = req.body.test;
    res.status(200).json('Sucess');
  }
};

let read: Api.IRoute = {
  path: '/:id',
  method: (req, res) => {
    let id = req.param('id', 'none');
    if (id !== 'none') {
      let item: boolean = true;
      return res.status(200).json(item);
    }
    return res.status(404).json('Not found');
  }
};

let update: Api.IRoute = {
  path: '/:id',
  method: (req, res) => {
    let id = req.param('id', 'none');
    if (id !== 'none') {
      let item: boolean = req.body.item;
      return res.status(200).json(item);
    }
    return res.status(404).json('Not found');
  }
};

let destroy: Api.IRoute = {
  path: '/:id',
  method: (req, res) => {
    console.log('Deleting item with id of ', req.param('id'));
    return res.status(204);
  }
};

export class Controller implements Api.IController {
  all: Api.IRoute = all;
  create: Api.IRoute = create;
  read: Api.IRoute = read;
  update: Api.IRoute = update;
  destroy: Api.IRoute = destroy;
}