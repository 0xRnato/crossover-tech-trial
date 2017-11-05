(function () {
  'use strict';

  angular
    .module('app.login')
    .factory('LoginService', LoginService)

  LoginService.$inject = ['$http'];

  function LoginService($http) {
    var service = {
      login: _login
    };

    return service;

    function _login(credential) {
      const headers = { 'Authorization': `Basic ${credential}` }
      return $http.get('/api/user/login', { headers });
    }
  }
})();
