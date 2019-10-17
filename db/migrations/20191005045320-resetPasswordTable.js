'use strict';

const uuid = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log('creating reset_password table...');
    return queryInterface.createTable('reset_password', {
      id: {
        type: Sequelize.UUID,
        defaultValue: () => uuid.v4(),
        primaryKey: true,
        allowNull: false,
        isUnique: true,
      },
      email: {
        type: Sequelize.STRING(128),
        allowNull: false,
        isUnique: false,
      },
      hash: {
        type: Sequelize.STRING(128),
        allowNull: false,
        isUnique: true,
      },
      expired_at: {
        type: sequelize.DATE,
        allowNull: false,
        isUnique: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        isUnique: false,
        defaultValue: true,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    console.log('dropping reset_password');
    return queryInterface.dropTable('reset_password');
  },
};
