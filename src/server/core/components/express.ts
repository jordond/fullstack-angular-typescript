'use strict';

import { join } from 'path';
import { stat } from 'fs';
import { hostname } from 'os';

import * as express from 'express';
import * as favicon from 'serve-favicon';

let bluebird = require('bluebird');
let statAsync = bluebird.promisify(join);

let morgan = require('morgan');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let cookieParser = require('cookie-parser');
let errorHandler = require('errorhandler');
let helmet = require('helmet');
let compression = require('compression');

import { create as Logger } from '../../utils/logger/index';
import { ExecutionTimer } from '../../utils/execution';


export default class Express implements Core.Component {
  private _log: Logger.Console;
  private _config: Config.IConfig;

  constructor(config: Config.IConfig) {
    this._log = Logger('Express');
    this._config = config;
  }

  init(app: any) {
    let timer = new ExecutionTimer();

    let _promise = (resolve: Function, reject: Function) => {
      this.setupServer(app).then(() => {
        this._log.info('Starting Express server on port [' + this._config.port + ']');
        let server = app.listen(this._config.port, () => {
          this._log.info('Server listening at [http://' + hostname() + ':' + this._config.port + ']');
          this._log.verbose('Web root [' + this._config.paths.client + ']');
          this._log.debug('Express instantionation took ' + timer.toString());
          resolve(server);
        });
      });
    };

    return new Promise(_promise);
  }

  setupServer(app: any) {
    // Setup express middleware
    let env: string = app.get('env');
    this._log.info('Setting up Express server instance in [' + env + '] mode');
    app.set('views', join(this._config.paths.server, 'views'));
    app.set('view engine', 'html');
    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(helmet());

    // Setup server paths
    app.use(express.static(join(this._config.paths.client)));
    app.set('clientPath', join(this._config.paths.client));

    // Environment specific options
    if (env === 'production') {
      app.use(morgan('combined', {
        skip: (req: express.Request, res: express.Response) => res.statusCode < 400
      }));
      return this.setupFavicon(app, this._config.paths.client);
    } else if (env === 'development') {
      app.use(morgan('dev'));
      app.use(errorHandler());
      return Promise.resolve();
    }
  }

  setupFavicon(app: any, path: string) {
    let faviconPath = join(path, 'favicon.ico');
    return statAsync(faviconPath).then((err: any) => {
      if (!err) {
        this._log.debug('Favicon exists and is being used');
        app.use(favicon(faviconPath));
      }
    });
  }
}