(function () {
  'use strict';

  angular
      .module('app.home')
      .factory('HomeService', HomeService)

  HomeService.$inject = ['$http', '$rootScope'];

  function HomeService($http, $rootScope) {
      var service = {
          logout: _logout
      };

      return service;

      function _logout(data) {
          return $http({
              method: 'POST',
              url: '/api/user/logout',
              headers: {
                  'x-access-token': $rootScope.userSession.token
              }, data: data
          });
      }
  }
})();
