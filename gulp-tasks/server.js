/**
 * Handle building of server source
 * - Clean all existing compiled server files
 * - Lint the typescript
 * - Compile to ES6 then Babel to ES5 w/Sourcemaps
 * - Watch for changes and rebuild only changed files
 */
'use strict';

var path = require('path');
var gulp = require('gulp-help')(require('gulp'));
var $ = require('gulp-load-plugins')();
var del = require('del');

var conf = require('../gulp.config');
var help = conf.help;

var linter = require('./linter')(gulp);
var isFirstRun = true;

gulp.task('clean:server', help.server.clean, function (done) {
  if (isFirstRun) {
    var dir = path.join(conf.paths.build, 'server');
    $.util.log('Cleaning ' + $.util.colors.blue('[' + path.resolve(dir) + ']'));
    return del(dir, done);
  }
  $.util.log($.util.colors.green('[Watching] Not cleaning'));
  return done();
});

gulp.task('vet:server', help.server.vet, ['clean:server'], function () {
  return linter('Server', conf.ts.server, !isFirstRun);
});

/**
 * Create the Typescript config object for gulp-typescript
 */
var tsConfig = require(conf.tsConfig.server).compilerOptions;
tsConfig.typescipt = require('typescript');
var server = $.typescript.createProject(tsConfig);

gulp.task('build:server', help.server.build, ['vet:server'], function () {
  // Definition file always needs to be passed in so compiler doesn't flip
  var definitions = path.join(conf.typings);
  var cache = $.cached.caches['TS:Compile'];
  if (cache) {
    delete cache[definitions];
  }

  // Transpile only changed files to ES6 then to Babel ES5
  var built = gulp.src([conf.ts.server, definitions], { base: conf.paths.server })
    .pipe($.plumber({ errorHandler: conf.errorHandler }))
      .pipe($.cached('TS:Compile'))
      .pipe($.sourcemaps.init())
        .pipe($.typescript(server))
        .pipe($.babel())
      .pipe($.size({ title: 'Compile:server', showFiles: !isFirstRun }))
      .pipe($.sourcemaps.write('maps', { sourceRoot: rewriteSource }))
    .pipe($.plumber.stop())
    .pipe(gulp.dest(path.join(conf.paths.build, 'server')));

  isFirstRun = false;
  return built;
});

gulp.task('watch:server', false, ['build:server'], function () {
  gulp.watch(conf.ts.server, ['build:server']);
});

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