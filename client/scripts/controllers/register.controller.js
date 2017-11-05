(function () {
  'use strict';

  angular
    .module('app.register')
    .controller('RegisterController', RegisterController)

  RegisterController.$inject = [
    '$rootScope',
    'RegisterService',
    '$mdToast',
    '$location',
    '$document',
    'sha256'
  ];

  function RegisterController(
    $rootScope,
    RegisterService,
    $mdToast,
    $location,
    $document,
    sha256
  ) {
    const vm = this;

    vm.register = () => {
      vm.dataLoading = true;
      if (vm.userData.password === vm.userData.confirmPassword) {
        const userData = angular.copy(vm.userData);
        delete userData.confirmPassword;
        userData.password = sha256.convertToSHA256(userData.password);
        RegisterService.register({ userData }).then(
          function sucessCallback(response) {
            if (response.data.status === 'success') {
              $mdToast.show($mdToast.simple().textContent('Account created successfully'));
              vm.userSession = response.data.data;
              $rootScope.userSession = angular.copy(vm.userSession);
              $location.path('/home');
            } else {
              $mdToast.show($mdToast.simple().textContent(response.data.data.message));
              vm.userData = {};
              const input = $document[0].getElementById('usernameForm');
              input.focus();
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
      } else {
        $mdToast.show($mdToast.simple().textContent('The password confirmation doesn\'t match, please try again.'));
        vm.userData.password = '';
        vm.userData.confirmPassword = '';
        const input = $document[0].getElementById('passwordForm');
        input.focus();
        vm.dataLoading = false;
      }
    }

    activate();

    function activate() {
      vm.dataLoading = false;
    }
  }
})();
