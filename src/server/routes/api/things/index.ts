'use strict';

import Routes from './things.routes';
import Model from './things.model';
import Socket from './things.socket';

export default <Route.Api.IEndpoint>{
  name: 'things',
  routes: Routes,
  model: Model,
  socket: Socket
}