import fs = require('fs');
import path = require('path');

/**
 * Directory handling
 */

interface IDirectoriesCallback {
  (err: NodeJS.ErrnoException, dirs: string[]): void;
}

function getDirs(directory: string, fn: IDirectoriesCallback) {
  let dirs: string[] = [];
  fs.readdir(directory, (err, files) => {
    if (err) { fn(err, null); }
    let remaining: number = files.length;
    for (var file of files) {
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

export var dirs = (directory: string, fn: IDirectoriesCallback) => getDirs(directory, fn);