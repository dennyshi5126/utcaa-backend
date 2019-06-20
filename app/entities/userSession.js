const { Op } = require('sequelize');
import entities from '../entities';
import { addDays } from '../utils/dateHandlers';

export default function(sequelize, Sequelize) {
  const userSession = sequelize.define(
    'userSession',
    {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        isUnique: true,
      },
      userId: {
        type: Sequelize.INTEGER(11),
        isUnique: false,
        allowNull: false,
        field: 'user_id',
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
      expireAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'expire_at',
      },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
      underscoredAll: true,
    }
  );

  userSession.associate = function(entities) {
    userSession.belongsTo(entities.user);
  };

  /**above are DB settings of the entity. below are 
	the business logics of userSession entity.
	**/
  userSession.findActiveSessionsByUser = function(email, uuId, sessionId) {
    const now = new Date();
    const findAction = new Promise((resolve, reject) => {
      entities.user.getByEmailAndUUId(email, uuId).then(function(user) {
        if (!user) {
          reject(Error('User does not exist.'));
        } else {
          userSession
            .find({
              where: {
                userId: user.id,
                email: email,
                sessionId: sessionId,
                active: true,
                expireAt: {
                  [Op.gt]: now,
                },
              },
            })
            .then(function(session) {
              resolve(session);
            })
            .catch(function(err) {
              reject(Error(err));
            });
        }
      });
    });
    return findAction;
  };

  userSession.add = function(userId, email, rememberSession) {
    const addExpiryDate = !!rememberSession ? 60 : 2;
    const expiry = addDays(new Date(), addExpiryDate);
    const sessionId = generateSessionId();
    return userSession.create({
      userId: userId,
      email: email,
      sessionId: sessionId,
      active: true,
      expireAt: expiry,
    });
  };

  return userSession;
}

const generateSessionId = () => {
  const secondsNow = new Date().getTime() / 1000;
  function v4() {
    return Math.floor((secondsNow + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return v4() + v4() + '-' + v4() + '-' + v4() + '-' + v4() + '-' + v4() + v4() + v4();
};
