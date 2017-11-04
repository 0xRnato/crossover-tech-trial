const errors = require('./error.model');

class Fail extends Error {
  constructor(
    type = 'unknow',
    message = errors.unknow.message,
    errorCode = errors.unknow.errorCode,
    validations = null,
  ) {
    super();
    this.status = 'fail';
    this.data = {
      errorCode,
      type,
      message,
      validations,
    };
  }
}

module.exports = Fail;
