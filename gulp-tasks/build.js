'use strict';

var path = require('path');
var gulp = require('gulp-help')(require('gulp'));
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var tsConfig = require('../' + conf.tsConfig.server).compilerOptions;
tsConfig.typescipt = require('typescript');
var server = $.typescript.createProject(tsConfig);

var showAllFiles = false;
gulp.task('build:server', conf.help.buildServer, ['vet:server'], function () {
  var build = gulp.src(conf.ts.server, { base: conf.paths.server })
    .pipe($.plumber({ errorHandler: conf.errorHandler }))
      .pipe($.cached('compile'))
      .pipe($.sourcemaps.init())
        .pipe($.typescript(server))
        .pipe($.babel())
      .pipe($.sourcemaps.write('.', { includeContent: false, sourceRoot: path.join('../..', '/src/server/') }))
      .pipe($.size({ title: 'TS:server', showFiles: showAllFiles }))
    .pipe($.plumber.stop())
    .pipe(gulp.dest(path.join(conf.paths.build, 'server')));

  showAllFiles = true;
  return build;
});


/**
 * For testing purposes
 */
gulp.task('test', 'test', ['build:server'], function () {
  gulp.start('watch');
});