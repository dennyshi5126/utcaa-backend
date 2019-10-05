'use strict';

const up = function(queryInterface, Sequelize) {
  console.log('creating departments...');
  return queryInterface
    .createTable('departments', {
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
    })
    .then(function() {
      console.log('inserting departments data...');
      return queryInterface.bulkInsert(
        'departments'[
          ({ name: '活动部 Events' },
          { name: '赞助部 Sponsorship' },
          { name: '市场部 Marketing' },
          { name: '人事部 HR' })
        ],
        {}
      );
    });
};

const down = function(queryInterface) {
  console.log('dropping departments...');
  return queryInterface.dropTable('departments');
};

module.exports = { up, down };
