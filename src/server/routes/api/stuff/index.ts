'use strict';

import Routes from './stuff.routes';
import Model from './stuff.model';
import Socket from './stuff.socket';

export default <Route.Api.IEndpoint>{
  name: 'stuff',
  routes: Routes,
  model: Model,
  socket: Socket
}