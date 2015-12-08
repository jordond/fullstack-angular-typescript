'use strict';

import * as path from 'path';

import * as mkdirp from 'mkdirp';
import * as _Sequelize from 'sequelize';
const Sequelize = (_Sequelize as any).default;

import { create as Logger } from '../../utils/logger/index';
import { ExecutionTimer } from '../../utils/execution';
import endpoints from '../../routes/api/endpoints';

let _db: any = {};

export function getDatabase() {
  return _db;
}

export default class Database implements Core.Component {
  private _log: Logger.Console;
  private _config: Config.IConfig;
  private _timer: ExecutionTimer;
  private _sequelize: any;

  constructor(config: Config.IConfig) {
    this._log = Logger('Database');
    this._config = config;
  }

  init(app: any) {
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

  finalize() {
    this._log.info('Finalizing database initialization');
    return this.registerAssociates()
      .then(this._sequelize.sync())
      .then(() => {
        this._log.info('Registered all database models');
        this._log.debug('Database instantionation took ' + this._timer.toString());
        _db.sequelize = this._sequelize;
      })
      .catch((err) => {
        this._log.error('Registering databases failed', err);
        throw err;
      });
  }

  // Move to ./routes/api/index.ts
  // registerApiModels() {
  //   let _promise = (resolve: Function, reject: Function) => {
  //     try {
  //       _log.verbose('Registering [' + endpoints.length + '] api models');
  //       for (let e of endpoints) {
  //         if (e.model.schema) {
  //           let model = _sequelize.define(e.model.name, e.model.schema)
  //           _log.verbose('Registering [' + model.name + '] model');
  //           _db[model.name] = model;
  //         } else {
  //           _log.warning('Model [' + e.model.name + '] has no schema, it will not be registered');
  //         }
  //       }
  //       resolve();
  //     } catch (error) {
  //       reject(error);
  //     }
  //   };
  //   return new Promise(_promise);
  // }

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