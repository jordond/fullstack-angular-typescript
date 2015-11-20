'use strict';

var path = require('path');
var gulp = require('gulp-help')(require('gulp'));
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var server = $.typescript.createProject(conf.tsConfig.server);
var showAllFiles = false;

gulp.task('build:server', conf.help.buildServer, ['vet:server'], function () {
  var build = gulp.src(conf.ts.server, { base: conf.paths.server })
    .pipe($.plumber({ errorHandler: conf.errorHandler }))
      .pipe($.cached('compile'))
      .pipe($.sourcemaps.init())
        .pipe($.typescript(server))
        .pipe($.babel())
      .pipe($.sourcemaps.write('.', { includeContent: false, sourceRoot: path.join(__dirname, '..', '/src/server/') }))
      .pipe($.size({ title: 'TS:server', showFiles: showAllFiles }))
    .pipe($.plumber.stop())
    .pipe(gulp.dest(path.join(conf.paths.build, 'server')));

  showAllFiles = true;
  return build;
});

/**
 * For testing purposes
 */

gulp.task('watch', 'watch for changes', function () {
  gulp.watch(conf.ts.server, ['build:server']);
});

gulp.task('test', 'test', ['build:server'], function () {
  gulp.start('watch');
});