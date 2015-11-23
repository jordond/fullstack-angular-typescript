///<reference path="index.d.ts" />
'use strict';

import * as angular from 'angular';

// App modules
import core from './app/core/core.module';
import home from './app/home/home.module';
import admin from './app/admin/admin.module';

let bootstrap =
  angular.module('app', [
    core,
    home,
    admin
  ]);

export default bootstrap;