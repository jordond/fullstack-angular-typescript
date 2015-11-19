'use strict';

import * as fs from 'fs';
import * as path from 'path';

/**
 * Directory handling
 */

interface IDirectoriesCallback {
  (err: NodeJS.ErrnoException, dirs: string[]): void;
}

/**
 * Get all of the subdirectories from a top level directory
 * It is not recursive so it will only get the first level of
 * subdirectories
 * @param {string}  directory Top directory to search in
 * @param {IDirectoriesCallback}  fn  Callback once search is complete
 */
function getDirs(directory: string, fn: IDirectoriesCallback) {
  let dirs: string[] = [];
  fs.readdir(directory, (err, files) => {
    if (err) { fn(err, null); }
    let remaining: number = files.length;
    for (let file of files) {
      file = path.resolve(directory, file);
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory) {
          dirs.push(file);
        }
        if (!--remaining) {
          fn(null, dirs);
        }
      });
    }
  });
}

export let readDirs = (directory: string, fn: IDirectoriesCallback) => getDirs(directory, fn);