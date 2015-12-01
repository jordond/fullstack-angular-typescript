'use strict';

import { Request, Response } from 'express';

export default class Controller implements Route.Api.IController {

  all(req: Request, res: Response) {
    console.log('all the stuff');
    return res.status(200).json({ things: [2, 3, 4, 5, 6, 7, 87] }).end();
  }

  create(req: Request, res: Response) {
    console.log('create the stuff');
    return res.sendStatus(200);
  }

  show(req: Request, res: Response) {
    console.log('show the stuff id: ', req.param('id'));
    return res.status(200).end();
  }

}