import express = require('express');
let router = express.Router();

import Admin = require('./admin.controller');
let ctrl = new Admin.Controller();

router.get(ctrl.all.path, ctrl.all.method);
router.post(ctrl.create.path, ctrl.create.method);
router.get(ctrl.read.path, ctrl.read.method);
router.put(ctrl.update.path, ctrl.update.method);
router.delete(ctrl.destroy.path, ctrl.destroy.method);

export = router;