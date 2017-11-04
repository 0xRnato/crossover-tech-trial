const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PW, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_PROTOCOL,
    pool: {
      max: 5,
      min: 0,
      idle: 30000,
    },
  },
);

sequelize.authenticate().then(() => {
  console.log('The connection with database has been established successfully.');
}).catch((err) => {
  throw (err);
});

class Database {
  static getConnection() {
    return sequelize;
  }
}

module.exports = Database;
