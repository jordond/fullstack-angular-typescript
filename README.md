# A Typescript, Angular, Webpack fullstack starter app

**Under active development, not ready for use**

**Update December 10**
I want to start working on other projects, and I feel the backend is in a decent enough place right now.  It works pretty well, and is fairly dynamic.  There isn't really a front-end demo to this, I may add one eventually.

A fullstack skeleton starter app for a trendy little web app.  Utilizing Typescript, ES6, Angular, and Webpack, with a nice gulp build system.  The client side relies on npm only and not bower.  It is more of a learning experience for me than anything.

## Features

- Written with typescript
- Uses ES6
- Backend & Frontend written in same workflow `Typescript -> ES6 -> Babel -> ES5`
- Entire stack is handled by webpack
- No bower, sticking to NPM
- Handy gulp tasks
- Easy configuration

## Tech
- **Backend**
  - Node (>v4)
  - Typescript
  - Babel
  - Webpack
- **Frontend**
  - Angular 1.x
  - Typescript
  - ES6
  - Webpack
  - Angular Material

## To-do
- **Backend**
  - ~~Redo the routes, and route loader~~
  - ~~Implement sockets and configs for each route~~
  - ~~Global server config, powered by a `./config.js`~~
- **Frontend**
  - Add an actual front end example
  - ~~Add a template cache so templates don't have to be loaded from server~~
  - ~~Make sure sourcemaps are working~~

## Main Tasks
**Soon to be replaced by npm scripts**
- `gulp`: Display a list of all available tasks
- `gulp vet`: Run TSLint on all of the Typescript files
- `gulp dev`: Compile server and client code, then watch for changes
- `gulp serve`: Start up nodemon in debug mode, instead of using IDE debugger
- `gulp build`: Build production optimized code
- `gulp deploy`: Deploy production code to remote server `deploy.config.js` needs to be edited
- `gulp bump`: Increment the version, see below for flags

### Flags
- `-p | --env=production`: Force the building of production optimized code
- `-d | --env=development`: Force the non optimized code
- `--port=5000`: Specify the proxy port for browserSync (port node will be listening)
- `--debug || --debug-brk`: Will force `gulp dev` to start nodemon
- **Versioning**
  - `--type=pre` bump the prerelease version *.*.*-x
  - `--type=patch` or no flag will bump the patch version *.*.x
  - `--type=minor` bump the minor version *.x.*
  - `--type=major` bump the major version x.*.*
  - `--version=x.x.x | -v x.x.x` bump to a specific version and ignore other flags

## Installing

1. Clone the repo `git clone git@github.com:jordond/hoogflix.git`
2. Install dependencies `npm install`
3. Compile by running `gulp build`

## Configuration

If you plan to use the deploy script, be sure to edit `deploy.config.js` with the information of the server.  To make changes to the folder structure change the paths in `gulp.config.js`.  BrowserSync settings can also be found in `gulp.config.js`.

## Running

A config file (see example.config.json) needs to be placed in the project root.  Or for better safety pass the path of the config file in as an argument.

`--config=path/to/config | -c path/to/config`

1. Export production environment `export ENV=production`
2. Run the server `node build/server/app.js`
  - Optionally run `ENV=production node build/server/app.js`

## Developing

### Issues

#### Bluebird warnings
I don't actually use bluebird in this app (save for a promisify maybe), as I wanted to try a ES6 experience.  However Sequelize depends on bluebirds for its promises.  With their latest update Bluebird introduced warnings if handling of promises wasn't done correctly.  Sequelize suffers from some of these warnings, and methods such as `.findAll() .findById() .count()` will display a huge block of warning code.  There is nothing I can do about that for the moment, so if you see them just ignore it. (My logger will not log bluebirds warnings)

#### Sourcemaps
Since I am now using webpack to handle the backend, the below fix is no longer required.

I also have switched to using `node-inspector` instead of of VSCode's debugger has VSCode is the problem when it comes to sourcemaps, as node-inspector can handle them just fine.

~~Not only does the filename not work properly, the actual sourceroot option for `gulp-sourcemaps` doesn't work either.
It is not pointing to the correct path relative to the source, so you get `build/server/src/server/index.ts` instead of
`src/server/index.ts`.  So I have added a bit of a hacky function that will count the number of slashes in the source file, that will determine how many folders deep it is, and how many `../` are required.~~

~~I could just use a simple `return path.join(__dirname, '..', 'src/server');` but since I am running
gulp on a remote server, and using VSCode locally, it ends up pointing to the absolute location on
the remote machine not local, confusing VSCode.~~

~~**I expect this to break any time now, I am monitoring the gulp-sourcemaps [issue](https://github.com/floridoo/gulp-sourcemaps/issues/163)**~~

----

#### NPM Modules
There is a current 'bug' in the way `typescript` and `gulp-babel` handle ES6 importing in regards
to npm modules.
As an example:
```javascript
import * as moment from 'moment'
```
Once transpiled by typescript and babel, the resulting `moment` is an inert object instead of a function.
Meaning that `moment().format('YYYY');` will not work, as `moment` is not a function.

The issue can be found [here](https://github.com/Microsoft/TypeScript/issues/5458), and the [pull request](https://github.com/Microsoft/TypeScript/issues/5285).  For the moment the workaround is as follows:

```javascript
import * as _moment from 'moment';
const moment = (_moment as any).default;
```
Yes it is ugly, but it works.

----

## License

```
The MIT License (MIT)

Copyright (c) 2015 Jordon de Hoog

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
