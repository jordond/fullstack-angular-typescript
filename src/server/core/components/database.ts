'use strict';

import * as fs from 'fs';
import * as path from 'path';

import * as mkdirp from 'mkdirp';
import * as _Sequelize from 'sequelize';
const Sequelize = (_Sequelize as any).default;
import * as bluebird from 'bluebird';

import { create as Logger } from '../../utils/logger/index';
import { ExecutionTimer } from '../../utils/execution';
import endpoints from '../../routes/api/endpoints';

let _log: Logger.Console;
let _sequelize: any;
let _db: any = {};
let _readDir = bluebird.promisify(fs.readdir);

export default class Database implements Core.Component {

  init(app: any, config: Config.IConfig) {
    let timer = new ExecutionTimer();
    _log = Logger('Database');
    _log.info('Registering all database models components');

    let conf = config.database;
    let options = {
      dialect: 'sqlite',
      storage: path.join(__dirname, conf.path || './data/database.sqlite')
    };
    mkdirp.sync(path.dirname(options.storage));
    _log.verbose('Using database at [' + path.resolve(options.storage) + ']');
    _sequelize = new Sequelize(conf.name, conf.username, conf.password, options);

    return this.registerApiModels()
      .then(this.registerOther)
      .then(this.registerAssociates)
      .then(_sequelize.sync())
      .then(() => {
        _log.info('Registered all database models');
        _log.debug('Database instantionation took ' + timer.toString());
        _db.Sequelize = Sequelize;
        _db.sequelize = _sequelize;
      })
      .catch((err) => {
        _log.error('Registering databases failed', err);
        throw err;
      });
  }

  registerApiModels() {
    let _promise = (resolve: Function, reject: Function) => {
      try {
        _log.verbose('Registering [' + endpoints.length + '] api models');
        for (let e of endpoints) {
          if (e.model.schema) {
            let model = _sequelize.define(e.model.name, e.model.schema)
            _log.verbose('Registering [' + model.name + '] model');
            _db[model.name] = model;
          } else {
            _log.warning('Model [' + e.model.name + '] has no schema, it will not be registered');
          }
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    };
    return new Promise(_promise);
  }

  registerOther() {
    _log.info('Inside registerOther')
    return Promise.resolve();
  }

  registerAssociates() {
    _log.verbose('Registering associate models');
    let _promise = (resolve: Function, reject: Function) => {
      Object.keys(_db).forEach((modelName) => {
        if ('associate' in _db[modelName]) {
          _log.verbose('Registering [' + modelName + '] associates');
          _db[modelName].associate(_db);
        }
      });
      resolve();
    };
    return new Promise(_promise);
  }
}

export let database = _db;