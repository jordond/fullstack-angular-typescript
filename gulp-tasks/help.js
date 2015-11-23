'use strict';

/**
 * Contains all the task descriptions to be used with gulp-help package
 * {
 *   taskName: 'Task description'
 * }
 */

module.exports = {
  vet: {
    both: 'Lint all typescript files',
    server: 'Lint server typescript',
    client: 'Lint client typescript',
  },
  build: {
    both: 'Compile server and bundle client',
    server: 'Compile server typescript to ES6->ES5',
    client: 'Bundle client source with webpack'
  },
  watch: 'Watch server and client files for changes'
};