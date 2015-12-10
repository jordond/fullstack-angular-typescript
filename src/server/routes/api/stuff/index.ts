'use strict';

import Routes from './stuff.routes';
import Model from './stuff.model';

export default <Route.Api.IEndpoint>{
  name: 'stuff',
  routes: Routes,
  model: Model
}