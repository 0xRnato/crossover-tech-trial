const Database = require('../config/db');
const Sequelize = require('sequelize');
const FailModel = require('./fail.model');
const errorModel = require('../models/error.model');

const sequelize = Database.getConnection();

class UserModel {
  constructor() {
    this.User = sequelize.define('users', {
      username: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      coins: {
        type: Sequelize.DECIMAL(7, 2),
        allowNull: false,
        defaultValue: 10000.00,
      },
    }, {
      timestamps: false,
    });
  }

  async findById(userId) {
    const user = await this.User.findById(userId);
    return user;
  }

  async findByUsername(username) {
    const user = await this.User.findOne({ where: { username } });
    return user;
  }

  async create(username, password) {
    try {
      const user = await this.User.create({ username, password });
      return user;
    } catch (err) {
      if (err.original.errno === 1062) {
        throw new FailModel(
          'validation',
          errorModel.errorUsernameUniqueKey.message,
          errorModel.errorUsernameUniqueKey.errorCode,
        );
      } else if (err.original.errno === 1406) {
        throw new FailModel(
          'validation',
          errorModel.errorDataTooLong.message,
          errorModel.errorDataTooLong.errorCode,
        );
      } else throw new FailModel();
    }
  }
}

module.exports = UserModel;
