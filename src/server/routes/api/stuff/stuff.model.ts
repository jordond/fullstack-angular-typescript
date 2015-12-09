'use strict';

import { IModel } from '../../core/components/database';
import * as Sequelize from 'sequelize';

export interface IStuff {
  title: string;
  description: string;
}

let Stuff: Route.Api.IModel = {
  name: 'stuff',
  schema: {
    title: Sequelize.STRING,
    description: Sequelize.STRING
  },
  methods: {
    classMethods: {
      associate: (models: IModel) => {
        models['stuff'].hasMany(models['things']);
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
        title: 'stuff1',
        description: 'should have a relation?'
      }
    ]
  }
};

export default Stuff;