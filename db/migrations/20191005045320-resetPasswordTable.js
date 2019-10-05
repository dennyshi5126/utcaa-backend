'use strict';

const uuid = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log('creating resetPasswordTable...');
    return queryInterface.createTable('resetPasswordTable', {
      id: {
        type: Sequelize.UUID,
        defaultValue: () => uuid.v4(),
        primaryKey: true,
        allowNull: false,
        isUnique: true,
      },
      user_id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        isUnique: false,
      },
      email: {
        type: Sequelize.STRING(128),
        allowNull: false,
        //maybe there is mutiple attempt reset.. can be mutiple request
        isUnique: false,
      },
      //add token and expire data for reset password
      reset_password_token: {
        type: Sequelize.STRING(128),
        allowNull: false,
        //so maybe need reset to null? if its unique
        isUnique: true,
      },
      expiry_timestamp: {
        type: sequelize.DATE,
        allowNull: false,
        isUnique: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    console.log('undo the up operation for reatsetpasswordtable');
    return queryInterface.dropTable('resetPasswordTable');
  },
};
