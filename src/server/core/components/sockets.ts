'use strict';

import * as socketIo from 'socket.io';

import { create } from '../../utils/logger/index';
import { ExecutionTimer } from '../../utils/execution';

export default class Sockets implements Core.Component {
  private _log: Logger.Console;
  private _io: any;
  private _socketsConnected: number;

  init(app: any, config: Config.IConfig) {
    let timer = new ExecutionTimer();
    this._log = create('Sockets');
    this._log.info('Initializing Socket.IO');
    this._log.verbose('Socket path [' + config.socket.path + ']');

    this._io = socketIo.listen(app, config.socket);
    this._io.on('connection', this.onConnect);

    this._log.verbose('Initial Socket setup finished');
    this._log.debug('Sockets instantiation took ' + timer.toString());
    return Promise.resolve();
  }

  get connected() {
    return this._socketsConnected;
  }

  onConnect(socket: any) {
    socket.connectedAt = new Date();
    socket.address = socket.handshake.address !== null ? socket.handshake.address : process.env.DOMAIN;
    this._socketsConnected++;

    this._log.info('[' + socket.address + '][' + socket.id + '] Connected');
    this._log.verbose('There are now [' + this._socketsConnected + '] sockets connected');

    socket.on('disconnect', this.onDisconnect);

    // Register database model events here
  }

  onDisconnect(socket: any) {
    this._socketsConnected--;
    this._log.info('[' + socket.address + '][' + socket.id + '] has disconnected');
    this._log.verbose('There are [' + this._socketsConnected + '] sockets remaining');
  }
}
