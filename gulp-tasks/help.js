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
  buildServer: 'Compile server-side typescript into javascript'
};