'use strict';

import Routes from './things.routes';
import Model from './things.model';
import Socket from './things.socket';

export default {
  name: 'things',
  routes: Routes,
  model: Model,
  socket: Socket
}