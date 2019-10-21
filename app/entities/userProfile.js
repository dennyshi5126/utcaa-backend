import entities from '../entities';
import { ERROR_TYPES as errors } from '../utils/errors';

export default (sequelize, Sequelize) => {
  const userProfile = sequelize.define(
    'userProfile',
    {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        authenticate: true,
        isUnique: true,
      },
      userId: {
        type: Sequelize.STRING(45),
        isUnique: true,
        allowNull: false,
        field: 'user_id',
      },
      firstName: {
        type: Sequelize.STRING(45),
        allowNull: false,
        field: 'first_name',
      },
      lastName: {
        type: Sequelize.STRING(45),
        allowNull: false,
        field: 'last_name',
      },
      phone: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      wechat: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      yearOfGraduation: {
        type: Sequelize.INTEGER(4),
        allowNull: false,
        field: 'year_of_graduation',
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
    },
    {
      tableName: 'user_profiles',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscoredAll: true,
    }
  );

  userProfile.editProfile = (userId, profileObject) => {
    const editProfileAction = new Promise((resolve, reject) => {
      entities.user.findOne({ where: { id: userId } }).then(existingUser => {
        if (!existingUser) reject(Error(errors.NOT_FOUND));
        else {
          userProfile
            .update(profileObject, { where: { userId } })
            .then(() => resolve({}))
            .catch(err => reject(err));
        }
      });
    });
  };

  userProfile.add = (userId, firstName, lastName, phone, wechat, yearOfGraduation, program, profession, city) => {
    return userProfile.create({
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      wechat: wechat,
      yearOfGraduation: yearOfGraduation,
      program: program,
      profession: profession,
      city: city,
    });
  };
  return userProfile;
};
