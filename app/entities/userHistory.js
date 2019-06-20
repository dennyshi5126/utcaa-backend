export default function(sequelize, Sequelize) {
  const userHistory = sequelize.define(
    'userHistory',
    {
      id: {
        type: Sequelize.INTEGER,
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
      actionTypeId: {
        type: Sequelize.INTEGER,
        isUnique: false,
        allowNull: false,
        field: 'action_type_id',
      },
    },
    {
      tableName: 'user_history',
      timestamps: true,
      createdAt: 'latest_action_at',
      updatedAt: false,
      underscoredAll: true,
    }
  );

  userHistory.associate = function(entities) {
    userHistory.belongsTo(entities.accountActionType);
    userHistory.belongsTo(entities.user);
  };

  userHistory.add = function(userId, actionTypeId) {
    const newData = {
      userId: userId,
      actionTypeId: actionTypeId,
    };
    return userHistory.create(newData);
  };

  return userHistory;
}
