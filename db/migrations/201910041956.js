'use strict';

const up = function(queryInterface, Sequelize) {
  console.log('creating departments...');
  return queryInterface.createTable('departments', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      isUnique: true,
    },
    name: {
      type: Sequelize.STRING(128),
      allowNull: false,
      isUnique: true,
    },
  });
};

module.exports = { up };
