import uuid from 'uuid';
import { addDays } from '../utils/dateHandlers';

export default function(sequelize, Sequelize) {
  const passwordReset = sequelize.define(
    'passwordReset',
    {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        isUnique: true,
      },
      email: {
        type: Sequelize.STRING(45),
        allowNull: false,
        field: 'email',
      },
      hash: {
        type: Sequelize.STRING(45),
        allowNull: false,
        field: 'hash',
      },
      expiredAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'expired_at',
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        filed: 'active',
      },
    },
    {
      tableName: 'password_resets',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
      underscoredAll: true,
    }
  );

  passwordReset.reset = email => {
    const createPromise = new Promise((resolve, reject) => {
      const hash = uuid.v4();
      const expiryDate = addDays(new Date(), 2);
      passwordReset
        .create({ email, hash, expiredAt: expiryDate })
        .then(() => resolve(hash))
        .catch(err => reject(new Error(err)));
    });
    return createPromise;
  };

  return passwordReset;
}
