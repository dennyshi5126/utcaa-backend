'use strict';
const uuid = require('uuid');

const up = function(queryInterface, Sequelize) {
  console.log('creating users...');
  return queryInterface
    .createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: () => uuid.v4(),
        primaryKey: true,
        allowNull: false,
        isUnique: true,
      },
      password: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      consented: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    })
    .then(function() {
      console.log('creating user_sessions...');
      return queryInterface
        .createTable('user_sessions', {
          id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            isUnique: true,
          },
          userId: {
            type: Sequelize.UUID,
            isUnique: false,
            allowNull: false,
            field: 'user_id',
            references: { model: 'users', key: 'id' },
          },
          email: {
            type: Sequelize.STRING(45),
            isUnique: true,
            allowNull: false,
            validate: {
              isEmail: true,
            },
          },
          sessionId: {
            type: Sequelize.STRING(120),
            allowNull: false,
            field: 'session_id',
          },
          active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'created_at',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          expireAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'expire_at',
          },
        })
        .then(function() {
          console.log('creating account_action_types...');
          return queryInterface
            .createTable('account_action_types', {
              id: {
                type: Sequelize.INTEGER(11),
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                isUnique: true,
              },
              name: {
                type: Sequelize.STRING(100),
                allowNull: false,
                field: 'name',
              },
            })
            .then(function() {
              console.log('initializing account_action_types...');
              return queryInterface.sequelize
                .query(
                  "INSERT INTO `account_action_types` VALUES (1,'signin'),\
          (2,'signout'),(3,'signup'),(4,'deactivate'), (5,'validate'),(6,'reset'),(7,'forgot'),\
          (8,'forgotvalidate');"
                )
                .then(function() {
                  console.log('creating user_history...');
                  return queryInterface.createTable('user_history', {
                    id: {
                      type: Sequelize.INTEGER(11),
                      primaryKey: true,
                      autoIncrement: true,
                      allowNull: false,
                      isUnique: true,
                    },
                    userId: {
                      type: Sequelize.UUID,
                      allowNull: false,
                      field: 'user_id',
                      references: { model: 'users', key: 'id' },
                    },
                    actionTypeId: {
                      type: Sequelize.INTEGER,
                      allowNull: false,
                      field: 'action_type_id',
                      references: { model: 'account_action_types', key: 'id' },
                    },
                    latestActionAt: {
                      type: Sequelize.DATE,
                      allowNull: false,
                      field: 'latest_action_at',
                      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                    },
                  });
                })
                .then(function() {
                  console.log('creating user_profiles...');
                  return queryInterface.createTable('user_profiles', {
                    id: {
                      type: Sequelize.INTEGER(11),
                      primaryKey: true,
                      autoIncrement: true,
                      allowNull: false,
                      isUnique: true,
                    },
                    user_id: {
                      type: Sequelize.UUID,
                      allowNull: false,
                      references: { model: 'users', key: 'id' },
                    },
                    first_name: {
                      type: Sequelize.STRING(45),
                      allowNull: false,
                    },
                    last_name: {
                      type: Sequelize.STRING(45),
                      allowNull: false,
                    },
                    phone: {
                      type: Sequelize.STRING(15),
                      allowNull: true,
                    },
                    wechat: {
                      type: Sequelize.STRING(45),
                      allowNull: true,
                    },
                    year_of_graduation: {
                      type: Sequelize.INTEGER(4),
                      allowNull: false,
                    },
                    program: {
                      type: Sequelize.STRING(100),
                      allowNull: false,
                    },
                    profession: {
                      type: Sequelize.STRING(100),
                      allowNull: true,
                    },
                    city: {
                      type: Sequelize.STRING(45),
                      allowNull: false,
                    },
                    created_at: {
                      type: Sequelize.DATE,
                      allowNull: false,
                      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                    },
                    updated_at: {
                      type: Sequelize.DATE,
                      allowNull: false,
                      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
                    },
                  });
                });
            });
        });
    });
};

module.exports = { up };
