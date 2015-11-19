'use strict';

var path = require('path');
var gulp = require('gulp-help')(require('gulp'));
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

gulp.task('vet:server', conf.help.vetServer, function(){
  return gulp.src(conf.ts.server)
    .pipe($.plumber({ errorHandler: conf.errorHandler }))
    .pipe($.cached('tslint'))
    .pipe($.tslint())
    .pipe($.tslint.report('prose', {
      summarizeFailureOutput: true
    }))
    .pipe($.size({title: 'TSLint:server'}))
    .pipe($.plumber.stop());
});