const _ = require('lodash');
const validationModel = require('../models/validation.model');
const errorModel = require('../models/error.model');
const AttributeModel = require('../models/attribute.model');
const FailModel = require('../models/fail.model');

class Validation {
  static validateRequest(validation, error, object) {
    return new Promise((resolve, reject) => {
      if (!validation || !error || !object || Object.keys(object).length === 0) {
        reject(new FailModel(
          'validation',
          errorModel.errorParameter.message,
          errorModel.errorParameter.errorCode,
        ));
      }

      const validations = [];
      _.forOwn(validationModel[validation], (value, key) => {
        if (!object || !object[key] || !value.validate(object[key]))
          validations.push(new AttributeModel(key, value.message));
      });

      if (validations.length) {
        reject(new FailModel(
          'validation',
          errorModel[error].message,
          errorModel[error].errorCode,
          validations,
        ));
      } else resolve(true);
    });
  }
}

module.exports = Validation;
