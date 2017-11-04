const jwt = require('jsonwebtoken');
const FailModel = require('../models/fail.model');
const errorModel = require('../models/error.model');
// TODO: apply the response model and
const auth = (req, res, next) => {
  let token = req.headers.authorization;

  if (token) {
    token = token.split(' ');
    if (token[0] === 'Basic') {
      let credentials = Buffer.from(token[1], 'base64').toString('ascii');
      credentials = {
        username: credentials.split(':')[0],
        password: credentials.split(':')[1],
      };
      req.headers.authorization = credentials;
      next();
    } else if (token[1] === 'Bearer') {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.json({// TODO: trocar para o FailModel
            success: false,
            err: err.message,
          });
        }
        req.decoded = decoded;
        next();
      });
    }
  } else {
    res.status(401).send(new FailModel(
      'access',
      errorModel.withoutCredentials.message,
      errorModel.withoutCredentials.errorCode,
    ));
  }
};

module.exports = auth;
