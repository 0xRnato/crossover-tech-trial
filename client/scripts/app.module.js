(function () {
  'use strict';

  angular.module('app', [
    'ngRoute',

    'app.routes',
    'app.socket',
    'app.login',
    'app.register',
    'app.home',
    'myApp',

    'ngMaterial',
    'angular-encryption',
    'base64'
  ]);

  angular.module('app.routes', []);
  angular.module('app.socket', []);
  angular.module('app.login', []);
  angular.module('app.register', []);
  angular.module('app.home', []);
  angular.module('myApp', []);
})();
