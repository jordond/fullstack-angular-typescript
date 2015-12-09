'use strict';

import { IModel } from '../../core/components/database';
import * as Sequelize from 'sequelize';

let Things: Route.Api.IModel = {
  name: 'things',
  schema: {
    title: Sequelize.STRING,
    description: Sequelize.STRING
  },
  methods: {
    classMethods: {
      associate: (models: IModel) => {
        models['things'].hasMany(models['stuff']);
      }
    },
    instanceMethods: function() {
      console.log('instanceMethod test');
    }
  },
  seeds: {
    overwrite: true,
    records: [
      {
        title: 'Thing1',
        description: 'Sample thing item to be seeded'
      },
      {
        title: 'Thing2 - Electric Boogaloo',
        description: 'Another thing'
      }
    ]
  }
};

export default Things;