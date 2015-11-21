'use strict';

var path = require('path');
var gulp = require('gulp-help')(require('gulp'));
var conf = require('./conf');
var help = conf.help;

var $ = require('gulp-load-plugins')();

gulp.task('vet:server', help.vet.server, function (){
  return lintFiles('Server', conf.ts.server);
});

gulp.task('vet:client', help.vet.client, function () {
  return lintFiles('Client', conf.ts.client);
});

gulp.task('vet', help.vet.both, ['vet:server', 'vet:client']);

function lintFiles(title, files) {
  return gulp.src(files)
    .pipe($.plumber({ errorHandler: conf.errorHandler }))
      .pipe($.cached('vet:' + title))
        .pipe($.tslint())
        .pipe($.tslint.report('prose', { summarizeFailureOutput: true }))
        .pipe($.size({title: 'TSLint:' + title}))
    .pipe($.plumber.stop());
}