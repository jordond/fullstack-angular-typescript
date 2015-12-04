/**
 * Main server configuration Defaults
 * Entrypoint for all of the applications configuration.
 *
 * This contains the defaults, while the `environment` directory
 * contains the environment specific configuration.
 *
 * On init, user config is applied.
 */

'use strict';

import * as path from 'path';
import * as fs from 'fs';
import * as _ from 'lodash';

import prod from './environments/production';
import dev from './environments/development';

let _config: Config.IConfig = {

  /**
   * Environment to run server in
   */
  env: process.env.NODE_ENV,

  /**
   * Server paths for express
   */
  paths: {
    root: path.normalize(__dirname + '/..'),
    client: path.normalize(__dirname + '/../client'),
    server: path.normalize(__dirname + '/../server'),
    webDir: '/'
  },

  /**
   * Port for express to listen on
   */
  port: process.env.PORT || 9000,

  /**
   * Default logger options
   * types: console, file, json, none
   */
  log: {
    path: './logs',
    filename: 'server.log',
    level: <string> 'INFO',
    short: <boolean> false,
    default: <string> 'INFO'
  },

  /**
   * Application secrets, these defaults should be changed and not checked
   * into source control
   */
  secrets: {
    session: 'YouShOuldREAllyreplaceTHIs'
  },

  /**
   * Api configuration, including path and security
   * NOTE: secure is not implemented
   */
  api: {
    root: '/api',
    secure: false // Not implemented
  }

};

/**
 * Initialize the configuration and gather all config options into
 * a single config object
 * @param   {Object}  config      User config.json file
 * @param   {String}  environment Decide which environment configuration to use
 * @returns {Object}  Combined configuration file. (defaults, environment, user)
 */
export default function init(config: any, environment?: string): any {
  let env = environment || config.env || _config.env;
  let environmentConfig = env === 'production' ? prod : dev;
  _config = _.merge(_config, environmentConfig || {}, config || {});

  return _config;
}