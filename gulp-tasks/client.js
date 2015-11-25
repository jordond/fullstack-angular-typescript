/**
 * Handle building of client source
 * - Clean all existing compiled client files
 * - Lint the typescript
 * - Package the source using webpack
 * - Watch for changes and lint, have webpack handle watching
 */
'use strict';

var path = require('path');
var gulp = require('gulp-help')(require('gulp'));
var del = require('del');
var argv = require('yargs').argv;
var $ = require('gulp-load-plugins')();

var conf = require('../gulp.config');
var help = conf.help;

var linter = require('./linter')(gulp);
var isFirstRun = true;
var isProduction = false;

var mode = $.util.colors.blue('[DEVELOPMENT]');
if (argv.p || (argv.env && argv.env.charAt(0).toLowerCase() === 'p')) {
  mode = $.util.colors.green('[PRODUCTION]');
  isProduction = true;
}
$.util.log('Running in ' + mode + ' mode');

gulp.task('clean:client', help.client.clean, function (done) {
  if (isFirstRun) {
    var dir = path.join(conf.paths.build, 'client');
    $.util.log('Cleaning ' + $.util.colors.blue('[' + path.resolve(dir) + ']'));
    return del(dir, done);
  }
  $.util.log($.util.colors.green('[Watching] Not cleaning'));
  return done();
});

gulp.task('vet:client', help.client.vet, ['clean:client'], function () {
  var linted = linter('Client', conf.ts.client, !isFirstRun);
  isFirstRun = false;
  return linted;
});

/**
 * Production build
 */

var plugins = require('webpack');
gulp.task('build:client', help.client.build, ['vet:client'], function () {
  var config = conf.webpack;
  config.plugins = config.plugins.concat(
    new plugins.DefinePlugin({ 'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
      new plugins.optimize.DedupePlugin(),
      new plugins.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    );

  return webpack(config);
});

/**
 * Development build with watch
 */

gulp.task('build:client:dev', help.client.devBuild, ['vet:client'], function () {
  var webpackConf = conf.webpack;
  webpackConf.devtool = 'sourcemap';
  webpackConf.watch = true;
  webpackConf.debug = true;
  return webpack(webpackConf);
});

gulp.task('watch:client', help.client.watch, function () {
  // Let webpack handle the watching & compilation
  if (isProduction) {
    gulp.start('build:client');
  } else {
    gulp.start('build:client:dev');
    //gulp.watch(conf.ts.client, ['build:client:dev']);
  }
});

function webpack(config) {
  return gulp.src(conf.ts.client)
    .pipe($.webpack(config))
    .pipe(gulp.dest(path.join(conf.paths.build, 'client')));
}
