'use strict';

import { Router } from 'express';
let router = Router();

import { Controller } from './admin.controller';
let ctrl = new Controller();

router.get(ctrl.all.path, ctrl.all.method);
router.post(ctrl.create.path, ctrl.create.method);
router.get(ctrl.read.path, ctrl.read.method);
router.put(ctrl.update.path, ctrl.update.method);
router.delete(ctrl.destroy.path, ctrl.destroy.method);

export default router;