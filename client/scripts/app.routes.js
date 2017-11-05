(function () {
  'use strict';

  angular
      .module('app.routes')
      .config(RoutesConfig)

  RoutesConfig.$inject = ['$routeProvider', '$locationProvider'];

  function RoutesConfig($routeProvider, $locationProvider) {
      $locationProvider.hashPrefix('');
      $routeProvider
          .when('/', {
              templateUrl: 'views/login.html',
              controller: 'LoginController',
              controllerAs: 'loginController',
          })
          .when('/register', {
              templateUrl: 'views/register.html',
              controller: 'RegisterController',
              controllerAs: 'registerController',
          })
          .when('/home', {
              templateUrl: 'views/home.html',
              controller: 'HomeController',
              controllerAs: 'homeController',
          })
          .otherwise({ redirectTo: '/' });
  }
}());
