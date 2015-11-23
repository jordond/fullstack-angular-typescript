'use strict';

var path = require('path');
var gulp = require('gulp-help')(require('gulp'));
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

gulp.task('watch', conf.help.watch, ['build'], function () {
  gulp.watch(conf.ts.server, ['build:server']);
  gulp.watch(conf.ts.client, ['vet:client']); // temporary until i get build process done
});
