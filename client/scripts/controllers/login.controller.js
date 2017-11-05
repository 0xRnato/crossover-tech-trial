(function () {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginController', LoginController)

  LoginController.$inject = [
    '$rootScope',
    'LoginService',
    '$mdToast',
    '$location',
    '$document',
    'sha256',
    '$base64'
  ];

  function LoginController(
    $rootScope,
    LoginService,
    $mdToast,
    $location,
    $document,
    sha256,
    $base64
  ) {
    const vm = this;

    vm.login = () => {
      vm.dataLoading = true;
      const userData = angular.copy(vm.userData);
      userData.password = sha256.convertToSHA256(userData.password);
      const userCredential = $base64.encode(`${userData.username}:${userData.password}`);
      LoginService.login(userCredential).then(
        function sucessCallback(response) {
          if (response.data.status === 'success') {
            vm.userSession = response.data.data;
            $rootScope.userSession = angular.copy(vm.userSession);
            $location.path('/home');
          } else {
            $mdToast.show($mdToast.simple().textContent(response.data.data.message));
            if (response.data.data.errorCode === 10006) {
              vm.userData.password = '';
              const input = $document[0].getElementById('passwordForm');
              input.focus();
            } else {
              vm.userData = {};
              const input = $document[0].getElementById('usernameForm');
              input.focus();
            }
            vm.dataLoading = false;
          }
        }, function errorCallback(response) {
          $mdToast.show($mdToast.simple()
            .textContent(`Status error: ${response.status} - ${response.statusText}`)
          );
          vm.userData = {};
          const input = $document[0].getElementById('usernameForm');
          input.focus();
          vm.dataLoading = false;
        }
      );
    };

    vm.register = () => {
      $location.path('/register');
    }

    activate();

    function activate() {
      vm.dataLoading = false;
    }
  }
})();
