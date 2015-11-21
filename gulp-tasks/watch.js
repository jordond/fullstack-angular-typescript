'use strict';

var path = require('path');
var gulp = require('gulp-help')(require('gulp'));
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

gulp.task('watch', 'watch for changes', function () {
  gulp.watch(conf.ts.server, ['build:server']);
});
