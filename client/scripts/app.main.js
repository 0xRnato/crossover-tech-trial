(function () {
  'use strict';

  angular.module('app', [
    'ngRoute',

    'app.routes',
    'app.login',
    'app.register',
    'app.home',

    'ngMaterial',
    'angular-encryption',
    'base64'
  ]);

  angular.module('app.routes', []);
  angular.module('app.login', []);
  angular.module('app.register', []);
  angular.module('app.home', []);
})();

(function () {
  'use strict';

  angular
    .module('app')
    .config(mainConfig)

  mainConfig.$inject = ['$mdThemingProvider'];

  function mainConfig($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey')
      .accentPalette('grey');
  }

}());
