const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');
const ValidationHelper = require('../helpers/validation.helper');

const userModel = new UserModel();

class UserController {
  static async register(userData) {
    await ValidationHelper.validateRequest('userAccess', 'errorParameter', userData);
    const user = await userModel.create(userData.username, bcrypt.hashSync(userData.password, bcrypt.genSaltSync(9)));
    const userObject = user.dataValues;
    delete userObject.password;
    const accessToken = jwt.sign({ userObject }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIMEOUT });
    return { userObject, accessToken };
  }
}

module.exports = UserController;
