'use strict';

import * as path from 'path';

import * as mkdirp from 'mkdirp';
import * as _Sequelize from 'sequelize';
const Sequelize = (_Sequelize as any).default;

import { create as Logger } from '../../utils/logger/index';
import { ExecutionTimer } from '../../utils/execution';
import endpoints from '../../routes/api/endpoints';

let _db: any = {};

export let database = _db;
export let models = _db.models;

/**
 * Grab a specific model
 * @param {string}  name  Name of the requested model
 * @returns {Object} Requested model if it exists
 */
export let model = function (name: string) {
  let model = _db.models[name];
  if (!model) {
    Logger('Database').error('Model [' + name + '] doesn\'t exist');
  }
  return model;
}

/**
 * Handles all the database initialization
 */
export default class Database implements Core.Component {
  private _log: Logger.Console;
  private _config: Config.IConfig;
  private _timer: ExecutionTimer;
  private _sequelize: any;

  /**
   * Create a new instance of the database
   * @param {IConfig} config  Global config
   */
  constructor(config: Config.IConfig) {
    this._log = Logger('Database');
    this._config = config;
  }

  /**
   * Initialize the database, by creating the directory and
   * the database object.
   * Make sure to call this.finalize(), after api models have been
   * registered.
   * @param {Express.Application} app Main application instance
   */
  init(app: any) {
    if (!app) {
      this._log.error('[init] App is not defined');
      throw 'App is not defined';
    }
    this._timer = new ExecutionTimer();
    this._log.info('Registering all database models components');

    let conf = this._config.database;
    let options = {
      dialect: 'sqlite',
      storage: path.join(__dirname, conf.path || './data/database.sqlite')
    };
    mkdirp.sync(path.dirname(options.storage));
    this._log.verbose('Using database at [' + path.resolve(options.storage) + ']');
    this._sequelize = new Sequelize(conf.name, conf.username, conf.password, options);
    _db.Sequelize = Sequelize;
    _db.sequelize = this._sequelize;

    return Promise.resolve(app);
  }

  /**
   * Call finalize once all the database models have been registered.
   * This will register any associate models, then sync the database.
   * @param {Boolean} force Drop tables before adding
   * @returns {Promise} Promise chain
   */
  finalize() {
    this._log.info('Finalizing database initialization');
    return this.registerAssociates()
      .then(this._sequelize.sync())
      .then(() => {
        this._log.info('Registered all database models');
        this._log.debug('Database instantionation took ' + this._timer.toString());
        return _db.sequelize = this._sequelize;
      })
      .catch((err) => {
        this._log.error('Registering databases failed', err);
        throw err;
      });
  }

  /**
   * Loop through all of the models and if there is an associate property
   * then register those associations
   * @returns {Promise} Promise EVERYTHING
   */
  registerAssociates() {
    this._log.verbose('Registering associate models');
    let _promise = (resolve: Function, reject: Function) => {
      Object.keys(_db).forEach((modelName) => {
        if ('associate' in _db[modelName]) {
          this._log.verbose('Registering [' + modelName + '] associates');
          _db[modelName].associate(_db);
        }
      });
      resolve();
    };
    return new Promise(_promise);
  }
}