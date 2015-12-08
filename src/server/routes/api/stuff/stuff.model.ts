'use strict';

import * as Sequelize from 'sequelize';

export default <Route.Api.IModel>{
  name: 'stuff',
  schema: {
    title: Sequelize.STRING,
    description: Sequelize.STRING
  }
}