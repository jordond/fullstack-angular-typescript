'use strict';

import * as path from 'path';

import * as mkdirp from 'mkdirp';
import * as _Sequelize from 'sequelize';
const Sequelize = (_Sequelize as any).default;

import { create as Logger } from '../../utils/logger/index';
import { ExecutionTimer } from '../../utils/execution';
import endpoints from '../../routes/api/endpoints';

let _log: Logger.Console;
let _db: IDatabase;

export let database = () => {
  return _db;
}

export interface IModel {
  [name: string]: _Sequelize.Model<any, any>;
}

export interface ISeed {
  model: _Sequelize.Model<any, any>;
  data: Route.Api.ISeedOptions;
}

export interface IDatabase {
  Sequelize: any;
  instance: _Sequelize.Sequelize;
  models: IModel;
  addSeed: (model: _Sequelize.Model<any, any>, modelData: Route.Api.ISeedOptions) => void;
  seeds: ISeed[];
}

/**
 * Grab a specific model
 * @param {string}  name  Name of the requested model
 * @returns {Object} Requested model if it exists
 */
export let model = function(name: string) {
  let model = _db.models[name];
  if (!model) {
    Logger('Database').error('Model [' + name + '] doesn\'t exist');
  }
  return model;
};

/**
 * Handles all the database initialization
 */
export default class Database implements Core.Component {
  private _config: Config.IConfig;
  private _timer: ExecutionTimer;

  /**
   * Create a new instance of the database
   * @param {IConfig} config  Global config
   */
  constructor(config: Config.IConfig) {
    _log = Logger('Database');
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
      _log.error('[init] App is not defined');
      throw 'App is not defined';
    }
    this._timer = new ExecutionTimer();
    _log.info('Registering all database models components');

    let conf = this._config.database;
    let options = {
      dialect: 'sqlite',
      storage: path.join(this._config.paths.dataDir, conf.filename || 'database.sqlite'),
      logging: (sql: string) => _log.debug('[SQL]\n', sql)
    };
    mkdirp.sync(path.dirname(options.storage));
    _log.verbose('Using [' + path.resolve(options.storage) + ']');
    _log.debug('Config:', options);

    _db = {
      Sequelize: Sequelize,
      instance: new Sequelize(conf.name, conf.username, conf.password, options),
      models: {},
      seeds: <ISeed[]>[],
      addSeed: addSeed
    }

    return Promise.resolve(app);
  }

  seed(): any {
    if (_db.seeds && _db.seeds.length > 0) {
      _log.info('Seeding database with [' + _db.seeds.length + '] seeds');
      let _promises: any = [];
      for (let seed of _db.seeds) {
        let promise:any;
        if (seed.data.overwrite) {
          _log.verbose('Deleting [' + seed.model.getTableName() + '] before seeding');
          promise = seed.model.destroy({ where: {} })
            .then(() => seed.model.bulkCreate(seed.data.records))
        } else {
          _log.verbose('Checking if records for [' + seed.model.getTableName() + '] exist');
          promise = seed.model.findAll().then((records: any[]) => {

          });
        }
        _promises.push(promise);
      }

      return Promise.all(_promises)
        .then(() => _log.verbose('Database has been seeded'))
        .catch((err) => {
          _log.error('Database seeding has failed', err);
          throw err;
        });

    } else {
      _log.verbose('No need to seed database');
      return Promise.resolve();
    }
  }

  /**
   * Call finalize once all the database models have been registered.
   * This will register any associate models, then sync the database.
   * @param {Boolean} force Drop tables before adding
   * @returns {Promise} Promise chain
   */
  finalize() {
    _log.info('Finalizing database initialization');
    return this.registerAssociates()
      .then(_db.instance.sync)
      .then(this.seed)
      .then(() => {
        _log.info('Registered all database models')
          .debug('Database instantionation took ' + this._timer.toString());
        return _db;
      })
      .catch((err) => {
        _log.error('Registering databases failed', err);
        throw err;
      });
  }

  /**
   * Loop through all of the models and if there is an associate property
   * then register those associations
   * @returns {Promise} Promise EVERYTHING
   */
  registerAssociates() {
    _log.verbose('Registering associate models');
    let _promise = (resolve: Function, reject: Function) => {
      Object.keys(_db).forEach((modelName) => {
        if ('associate' in _db.models[modelName]) {
          _log.verbose('Registering [' + modelName + '] associates');
          _db.models[modelName].associate(_db.models);
        }
      });
      resolve();
    };
    return new Promise(_promise);
  }
}

function addSeed(model: _Sequelize.Model<any, any>, modelData: Route.Api.ISeedOptions) {
  if (!modelData) {
    return;
  }
  _log.debug('Adding seed for [' + model.getTableName() + ']', modelData);
  let seed: ISeed = {
    model: model,
    data: modelData
  };
  _db.seeds.push(seed);
}