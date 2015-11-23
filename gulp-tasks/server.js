/**
 * Handle the compilation of the server source code
 */
'use strict';

var path = require('path');
var gulp = require('gulp-help')(require('gulp'));
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var tsConfig = require(conf.tsConfig.server).compilerOptions;
tsConfig.typescipt = require('typescript');
var server = $.typescript.createProject(tsConfig);

var showAllFiles = false;
gulp.task('build:server', conf.help.build.server, ['vet:server'], function () {
  // Definition file always needs to be passed in so compiler doesn't flip
  var definitions = path.join(conf.typings);
  var cache = $.cached.caches['TS:Compile'];
  if (cache) {
    delete cache[definitions];
  }

  // Transpile only changed files to ES6 then to Babel ES5
  var build = gulp.src([conf.ts.server, definitions], { base: conf.paths.server })
    .pipe($.plumber({ errorHandler: conf.errorHandler }))
      .pipe($.cached('TS:Compile'))
      .pipe($.sourcemaps.init())
        .pipe($.typescript(server))
        .pipe($.babel())
      .pipe($.size({ title: 'Compile:server', showFiles: showAllFiles }))
      .pipe($.sourcemaps.write('maps', { sourceRoot: rewriteSource }))
    .pipe($.plumber.stop())
    .pipe(gulp.dest(path.join(conf.paths.build, 'server')));

  // For gulp-size first run show no files, only output changed files
  showAllFiles = true;
  return build;
});

gulp.task('build', conf.help.build.both, ['build:server']);

/**
 * A hack to get the proper source directory, since
 * gulp runs remotely, and VSCode runs locally a simple
 * path.join(__dirname, '..', '../../src/server) doesn't work
 * its very hacky and will probably break.  Also need to manually apply
 * this fix to gulp-babel: https://github.com/babel/gulp-babel/issues/54
 */
function rewriteSource(file) {
  var slashCount = file.sourceMap.file.split('/').length;
  var subdirs = new Array(slashCount).join('../');
  return path.join(subdirs, '../../src/server');
}