(function () {
  'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController)

  HomeController.$inject = [
    'HomeService',
    '$mdToast',
    '$location',
    '$rootScope',
    'socket',
    '$document',
    "$scope",
    '$anchorScroll'
  ];

  function HomeController(
    HomeService,
    $mdToast,
    $location,
    $rootScope,
    socket,
    $document,
    $scope,
    $anchorScroll
  ) {
    const vm = this;
    let userSession;

    vm.logout = () => {
      vm.dataLoading = true;
      HomeService.logout({
        'userData': {
          'username': angular.copy($rootScope.userSession.username)
        }
      }).then(
        function sucessCallback(response) {
          if (response.data.success) {
            delete $rootScope.userSession;
            $mdToast.show($mdToast.simple().textContent('Bye'));
            socket.disconnect();
            $location.path('/login');
          } else {
            $mdToast.show($mdToast.simple().textContent(response.data.err));
            vm.dataLoading = false;
          }
        },
        function errorCallback(response) {
          $mdToast.show($mdToast.simple()
            .textContent(`Status error: ${response.status} - ${response.statusText}`)
          );
          vm.dataLoading = false;
        }
        );
    }

    vm.sendMsg = () => {
      if (vm.message) {
        const msg = {
          from: $rootScope.userSession.username,
          message: vm.message
        }
        socket.emit('msg', msg);
        vm.messages.push(msg);
        vm.message = '';
        $scope.$digest();
      }
    }

    socket.on('welcome', (_username) => {
      $mdToast.show($mdToast.simple().textContent(`${_username} has connected to the auction.`));
    });

    socket.on('left', (_username) => {
      $mdToast.show($mdToast.simple().textContent(`${_username} has disconnected from the auction.`));
    });

    socket.on('msg', (_message) => {
      vm.messages.push(_message);
      $scope.$digest();
    });

    activate();

    function activate() {
      userSession = $rootScope.userSession;
      $mdToast.show($mdToast.simple().textContent('Welcome ' + userSession.userObject.username));
      socket.emit('login', userSession.userObject.username);
      vm.messages = [];
    }
  }
})();
