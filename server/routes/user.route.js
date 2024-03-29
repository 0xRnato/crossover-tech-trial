const SuccessModel = require('../models/success.model');
const FailModel = require('../models/fail.model');
const UserController = require('../controllers/user.controller');
const errorModel = require('../models/error.model');
const authHelper = require('../helpers/auth.helper');

module.exports = (router) => {
  router.get('/login', authHelper, async (req, res) => {
    try {
      const response = await UserController.login(req.headers.authorization);
      res.status(200).send(new SuccessModel(response));
    } catch (err) {
      if (!err.data || !err.data.type || !err.data.errorCode || !err.data.message)
        res.status(500).send(new FailModel());
      else
        res.status(200).send(err);
    }
  });

  router.post('/register', async (req, res) => {
    if (!req.body.userData) {
      res.status(400).send(new FailModel(
        'access',
        errorModel.withoutCredentials.message,
        errorModel.withoutCredentials.errorCode,
      ));
      return;
    }
    try {
      const response = await UserController.register(req.body.userData);
      res.status(200).send(new SuccessModel(response));
      return;
    } catch (err) {
      if (!err.data || !err.data.type || !err.data.errorCode || !err.data.message)
        res.status(500).send(new FailModel());
      else
        res.status(200).send(err);
    }
  });
};
