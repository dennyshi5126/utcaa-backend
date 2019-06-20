export default function(sequelize, Sequelize) {
  let accountActionType = sequelize.define(
    'accountActionType',
    {
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
    },
    {
      timestamps: false,
      underscoredAll: true,
    }
  );

  accountActionType.getByName = name => {
    return accountActionType.findOne({ where: { name } });
  };

  accountActionType.associate = function(entities) {
    accountActionType.hasMany(entities.userHistory);
  };

  return accountActionType;
}
