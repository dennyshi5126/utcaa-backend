import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config/config';
const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db, {
  logging: false,
});
const db = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return file.indexOf('.') > 0 && file !== 'index.js' && file.indexOf('.log') === -1;
  })
  .forEach(function(file) {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
