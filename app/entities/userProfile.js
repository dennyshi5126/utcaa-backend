import entities from '../entities';

export default function(sequelize, Sequelize) {
  const userProfile = sequelize.define(
    'userProfile',
    {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        isUnique: true,
      },
      userId: {
        type: Sequelize.STRING(45),
        isUnique: true,
        allowNull: false,
        field: 'user_id',
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
      tableName: 'user_profile',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscoredAll: true,
    }
  );

  userProfile.editProfile = function(userId, phone, wechat, yearOfGraduation, program, profession, city) {
    const editProfileAction = new Promise((resolve, reject) => {
      const profileObject = { phone, wechat, yearOfGraduation, program, profession, city };
      userProfile
        .update(profileObject, { where: { userId } })
        .then(() => resolve({}))
        .catch(err => reject(err));
    });
  };
}
