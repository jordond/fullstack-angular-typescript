'use strict';

import * as Sequelize from 'sequelize';

export default <Database.IModel>{
  name: 'things',
  schema: {
    title: Sequelize.STRING,
    description: Sequelize.STRING
  }
}