//const { Op } = require('sequelize');
import { Op } from 'sequelize';
import { hash, compare } from '../security/bcryptor';
import { ERROR_TYPES as errors } from '../utils/errors';
import entities from '../entities';
import uuid from 'uuid';
import { isAuthenticated } from '../security/authProvider';
import userSessions from '../repositories/userSessions';
import emailSender from '../utils/email/sender';
import assembleResetPasswordEmail from '../utils/email/templates/forgetPassword';
import passwordReset from './passwordReset';

export default function(sequelize, Sequelize) {
  const user = sequelize.define(
    'user',
    {
      id: {
        type: Sequelize.STRING(45),
        primaryKey: true,
        allowNull: false,
        isUnique: true,
      },
      email: {
        type: Sequelize.STRING(128),
        allowNull: false,
        //email should be unique since the need to be use for reset
        isUnique: true,
      },
      password: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      consented: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: 'users',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscoredAll: true,
    }
  );

  user.add = (id, email, password, consented) => {
    const hashedPassword = hash(password);
    return user.create({
      id: id,
      email: email,
      password: hashedPassword,
      consented: true,
    });
  };

  user.associate = entities => {
    user.hasMany(entities.userHistory);
    user.hasMany(entities.userSession);
  };

  user.checkPermission = (id, requestPermission) => {
    const checkRight = new Promise((resolve, reject) => {
      entities.user
        .findOne({ where: { id } })
        .then(existingUser => {
          entities.groupPermissionMap
            .findAll({ where: { groupId: existingUser.groupId } })
            .then(maps => {
              const permissionIds = maps.map(map => map.permissionId);
              entities.permission
                .findAll({
                  where: {
                    id: {
                      [Op.in]: permissionIds,
                    },
                    name: requestPermission,
                  },
                })
                .then(result => {
                  if (!result) {
                    reject(Error(errors.UNAUTHENTICATED));
                    return;
                  }
                  resolve(true);
                })
                .catch(() => {
                  reject(Error(errors.INTERNAL_SERVER_ERROR));
                });
            })
            .catch(() => {
              reject(Error(errors.INTERNAL_SERVER_ERROR));
            });
        })
        .catch(() => {
          reject(Error(errors.INTERNAL_SERVER_ERROR));
        });
    });
    return checkRight;
  };

  user.authenticate = (userId, email, sessionId) => {
    const authenticate = new Promise((resolve, reject) => {
      isAuthenticated(userId, email, sessionId)
        .then(function() {
          resolve(true);
        })
        .catch(function() {
          reject(Error(errors.UNAUTHENTICATED));
        });
    });
    return authenticate;
  };

  user.signup = (email, password, firstName, lastName, phone, wechat, yearOfGraduation, program, profession, city) => {
    const signupAction = new Promise((resolve, reject) => {
      user.findOne({ where: email }).then(email => {
        if (email == user.email) reject(Error(errors.DATA_STATE_CONFILCT));
        else {
          let userId = uuid.v4();
          user.add(id, email, password, consented).then(() => {
            userProfile
              .add(userId, firstName, lastName, phone, wechat, yearOfGraduation, program, profession, city)
              .then(() => resolve({}));
          });
        }
      });
    });
    return signupAction;
  };

  user.signin = (email, password, rememberSession) => {
    const signinAction = new Promise((resolve, reject) => {});
    const signinAction = new Promise((resolve, reject) => {
      user.findOne({ where: { email } }).then(async existingUser => {
        if (!existingUser) {
          reject(Error(errors.NOT_FOUND));
        } else if (!compare(email, existingUser.email)) {
          reject(Error(errors.NOT_FOUND));
        } else {
          const userId = existingUser.id;
          const userSession = await entities.userSession.add(userId, email, rememberSession);
          resolve({ userId: existingUser.id, sessionId: userSession.id });
        }
      });
    });

    return signinAction;
  };

  user.getProfile = id => {
    return user.findOne({
      attributes: ['id'],
      where: { id },
    });
  };

  user.edit = (userId, name) => {
    const editUserAction = new Promise((resolve, reject) => {
      user.findOne({ where: { id: userId } }).then(function(existingUser) {
        const userObject = {};
        let dataChanged = false;
        if (!existingUser) {
          reject(Error(errors.NOT_FOUND));
        } else {
          if (name !== existingUser.name) {
            userObject.name = name;
            dataChanged = true;
          }
          if (dataChanged) {
            user
              .update(userObject, { where: { id: userId } })
              .then(() => {
                resolve({});
              })
              .catch(error => {
                reject(error);
              });
          } else {
            resolve({});
          }
        }
      });
    });
    return editUserAction;
  };

  user.signout = function(email, id, sessionId, logoutAll) {
    const signoutAction = new Promise((resolve, reject) => {
      user.findOne({ where: { email, id } }).then(function(existingUser) {
        if (!existingUser) {
          reject(Error(errors.UNAUTHENTICATED));
        } else {
          if (logoutAll) {
            userSessions
              .deactivateAllSessions(existingUser.id)
              .then(function() {
                resolve(true);
              })
              .catch(function(err) {
                reject(Error(err));
              });
          } else {
            userSessions
              .deactivateSession(existingUser.id, sessionId)
              .then(function() {
                resolve(true);
              })
              .catch(function(err) {
                reject(Error(err));
              });
          }
        }
      });
    });
    return signoutAction;
  };

  user.forgetPassword = function(email) {
    const forgetPasswordAction = new Promise(async (resolve, reject) => {
      user.findOne({ where: { email: email } }).then(async function(existingUser) {
        if (!existingUser) {
          reject(Error(errors.NOT_FOUND));
        } else {
          const emailQuery = `?email=${email.replace('@', '%40')}`;
          const resetTableAtion = await entities.passwordReset.reset(email);
          const emailOptions = assembleResetPasswordEmail(
            '?' + 'hash=' + resetTableAtion.hash + '&email=' + emailQuery
          );
          emailSender
            .send(email, emailOptions.bcc, emailOptions.title, emailOptions.content, emailOptions.html)
            .then(email => resolve(email))
            .catch(error => reject(error));
        }
      });
    });
    return forgetPasswordAction;
  };

  user.updatePassword = function(userId, password, oldPassword) {
    const updatePasswordPromise = new Promise((resolve, reject) => {
      user.findOne({ where: { id: userId } }).then(function(existingUser) {
        if (!existingUser) {
          reject(Error(errors.NOT_FOUND));
        } else {
          if (compare(oldPassword, existingUser.password)) {
            user
              .update({ password: hash(password) }, { where: { id: userId } })
              .then(() => {
                userSessions
                  .deactivateAllSessions(existingUser.id)
                  .then(function() {
                    resolve({});
                  })
                  .catch(function(err) {
                    reject(Error(err));
                  });
              })
              .catch(error => {
                reject(error);
              });
          } else {
            reject(Error(errors.UNAUTHENTICATED));
          }
        }
      });
    });
    return updatePasswordPromise;
  };

  user.confirmForgetPassword = function(email, hash) {
    const now = new Date();
    const confirmForgetPasswordPromise = new Promise((resolve, reject) => {
      entities.passwordReset
        .findOne({
          where: {
            email,
            hash,
            expiredAt: {
              [Op.gt]: now,
            },
          },
        })
        .then(resetHash => {
          if (!resetHash) {
            reject(Error(errors.INVALID_INPUT_DATA));
          } else {
            resolve({});
          }
        });
    });
    return confirmForgetPasswordPromise;
  };

  user.resetPassword = function(email, password, id) {
    const resetPasswordPromise = new Promise((resolve, reject) => {
      let where = { id };
      if (!id) {
        where = { email };
      }
      user
        .findOne({ where })
        .then(function(existingUser) {
          if (!existingUser) {
            reject(Error(errors.NOT_FOUND));
          } else {
            user
              .update({ password: hash(password) }, { where: { id: existingUser.id } })
              .then(() => {
                userSessions
                  .deactivateAllSessions(existingUser.id)
                  .then(function() {
                    resolve({});
                  })
                  .catch(function(err) {
                    reject(Error(err));
                  });
              })
              .catch(error => {
                reject(error);
              });
          }
        })
        .catch(error => {
          reject(error);
        });
    });
    return resetPasswordPromise;
  };

  return user;
}
