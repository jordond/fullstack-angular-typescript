'use strict';

/**
 * Contains the majority of the configuartion for the gulp tasks
 */

var path = require('path');
var gutil = require('gulp-util');

var paths = {
  src: 'src',
  server: 'src/server',
  client: 'src/client',
  tmp: '.tmp',
  build: 'build'
};

var serverTs = path.join(paths.server, '**/*.ts');
var clientTs = path.join(paths.client, '**/*.ts');

var serverTsconfig = path.join('..', paths.server, 'tsconfig.json');
var clientTsconfig = path.join('..', paths.client, 'tsconfig.json');

var typings = path.join(__dirname, '..', 'typings/tsd.d.ts');

function errorHandler(err) {
  var title = '';
  if (err.plugin) {
    title = err.plugin.replace('gulp-', '');
  } else if (err.name) {
    title = err.name.replace('error', '').trim();
  }
  gutil.log(gutil.colors.red('[' + title + ']'), err.message);
  this.emit('end');
}

/**
 * Exports
 */

var config = {
  paths: paths,
  tsConfig: {
    server: serverTsconfig,
    client: clientTsconfig
  },
  ts: {
    all: [serverTs, clientTs],
    server: serverTs,
    client: clientTs
  },
  typings: typings,
  errorHandler: errorHandler,
  help: require('./help')
};

module.exports = config;