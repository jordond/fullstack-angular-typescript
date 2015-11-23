'use strict';

var path = require('path');
var gulp = require('gulp-help')(require('gulp'));
var conf = require('./conf');
var help = conf.help;

var $ = require('gulp-load-plugins')();

var listServer = false;
gulp.task('vet:server', help.vet.server, function () {
  var lint = lintFiles('Server', conf.ts.server, listServer);
  listServer = true;
  return lint;
});

var listClient = false;
gulp.task('vet:client', help.vet.client, function () {
  var lint = lintFiles('Client', conf.ts.client, listClient);
  listClient = true;
  return lint;
});

gulp.task('vet', help.vet.both, ['vet:server', 'vet:client']);

var listFiles = false;
function lintFiles(title, files, display) {
  return gulp.src(files)
    .pipe($.plumber({ errorHandler: conf.errorHandler }))
      .pipe($.cached('vet:' + title))
        .pipe($.tslint())
        .pipe($.tslint.report('prose', { summarizeFailureOutput: true }))
        .pipe($.size({ title: 'Linter:' + title, showFiles: display }))
    .pipe($.plumber.stop());
}