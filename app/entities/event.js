export default (sequelize, Sequelize) => {
  const event = sequelize.define(
    'event',
    {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        isUnique: true,
      },
      category: {
        type: Sequelize.STRING(100),
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
        isUnique: true,
      },
      time: {
        type: Sequelize.DATE,
      },
      location: {
        type: Sequelize.STRING(100),
      },
      imageUrl: {
        type: Sequelize.STRING(200),
        allowNull: false,
        isUnique: true,
        field: 'image_url',
      },
      link: {
        type: Sequelize.STRING(1000),
        isUnique: true,
      },
      eventPhotos: {
        type: Sequelize.STRING(1000),
        field: 'event_photos',
      },
    },
    {
      tableName: 'events',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscoredAll: true,
    }
  );

  event.list = () => {
    return user.findAll({
      attributes: ['id', 'title', 'imageUrl', 'link'],
      order: [['time', 'DESC']],
    });
  };
};
