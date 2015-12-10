'use strict';

import { Request, Response } from 'express';
import { Model } from 'sequelize';

import { database } from '../../../core/components/database';
import { IStuff } from './stuff.model';

let Stuff: Model<any, any>;

export default class Controller implements Route.Api.IController {
  constructor() {
    Stuff = database().models['stuff'];
  }

  all(req: Request, res: Response) {
    Stuff
      .findAll()
      .then((docs) => res.status(200).json(docs))
      .catch((err) => res.status(500).json(err));
  }

  create(req: Request, res: Response) {
    Stuff
      .create({ title: 'TestCreate', description: 'TestDesc' })
      .then((value) => res.status(200).json(value))
      .catch((err) => res.status(500).json(err));
  }

  show(req: Request, res: Response) {
    Stuff
      .findById(req.params.id)
      .then((value) => res.status(200).json(value))
      .catch((err) => res.status(404).json(err));
  }

}