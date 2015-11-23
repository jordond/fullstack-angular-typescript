'use strict';

// Core vendor css
require('angular-material/angular-material.css');
require('font-awesome/css/font-awesome.css');

// Core vendor libs
import * as ngAnimate from 'angular-animate';
import * as ngUiRouter from 'angular-ui-router';
import * as ngMaterial from 'angular-material';

// Core module config
import routing from './core.routes';

let dependencies: string[] = [
/* Angular modules */
  ngAnimate,

/* Cross-app modules */

/* 3rd party modules */
  ngUiRouter,
  ngMaterial
];

let core =
  angular
    .module('app.core', dependencies)
    .config(routing);

export default core.name;