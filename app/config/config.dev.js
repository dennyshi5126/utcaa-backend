module.exports = {
  db: {
    username: "utcaa_app_user",
    password: "mpL1w^v9",
    database: "utcaa",
    host: "127.0.0.1",
    port: "3306",
    dialect: "mysql",
    operatorsAliases: false,
    seederStorage: "sequelize",
    define: {
      underscored: true
    }
  },
  baseUrl: "http://localhost:8082/ob",
  logger: {
    path: __dirname + "../../../logs/"
  },
  env: "dev",
  port: "8080"
};
