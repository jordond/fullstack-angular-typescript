'use strict';

import { Request, Response } from 'express';
import { Model } from 'sequelize';
import { database } from '../../../core/components/database';

let Things: Model<any, any>;

/**
 *
 * TODO
 * Change to using a DAO, this is for testing
 *
 */


export default class Controller implements Route.Api.IController {
  constructor() {
    Things = database().models['things'];
  }

  all(req: Request, res: Response) {
    Things.findAll()
      .then((docs) => res.status(200).json(docs))
      .catch((err) => res.status(500).json(err));
  }

  create(req: Request, res: Response) {
    Things.create({ title: 'TestCreate', description: 'TestDesc' })
      .then((value) => {
        return res.status(200).json(value);
      })
      .catch((err) => res.status(500).json(err));
  }

  show(req: Request, res: Response) {
    console.log('show the thing id: ', req.param('id'));
    return res.status(200).end();
  }

}