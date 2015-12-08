'use strict';

import * as Sequelize from 'sequelize';

export default <Route.Api.IModel>{
  name: 'things',
  schema: {
    title: Sequelize.STRING,
    description: Sequelize.STRING
  },
  methods: {
    classMethods: function() {
      console.log('classMethod test');
    },
    instanceMethods: function() {
      console.log('instanceMethod test');
    }
  }
}