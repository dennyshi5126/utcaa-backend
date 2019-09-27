import entities from '../entities';

export default function(sequelize, Sequelize) {
  const department = sequelize.define(
    'deparment',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        isUnique: true,
      },
      name: {
        type: Sequelize.STRING(128),
        isUnique: true,
        allowNull: false,
      },
    },
    {
      tableName: 'department',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscoredAll: true,
    }
  );

  department.getDepartments = function() {
    const getDepartmentsAction = new Promise((resolve, reject) => {
      //logics
    });
    return getDepartmentsAction;
  };
}
