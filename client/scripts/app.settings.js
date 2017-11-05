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
