export default (sequelize, Sequelize) => {
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
      tableName: 'departments',
      timestamps: false,
    }
  );

  department.list = () => {
    return department.findAll();
  };

  return department;
};
