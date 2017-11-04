const errors = {
  unknow: {
    message: 'An unexpected error has occurred, sorry for the inconvenience.',
    errorCode: 10001,
  },
  errorParameter: {
    message: 'Error in parameter validation.',
    errorCode: 10002,
  },
  withoutCredentials: {
    message: 'Trying to access the API without credentials.',
    errorCode: 10003,
  },
  errorUsernameUniqueKey: {
    message: 'This user name is already being used by another user.',
    errorCode: 10004,
  },
  errorDataTooLong: {
    message: 'This data it\'s too long for this field.',
    errorCode: 10005,
  },
  errorPasswordWrong: {
    message: 'Wrong password, please try again.',
    errorCode: 10006,
  },
};

module.exports = errors;
