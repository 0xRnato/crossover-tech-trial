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
    '$window',
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
    $window,
    $scope,
    $anchorScroll
  ) {
    const vm = this;
    let userSession;

    vm.logout = (forced) => {
      vm.dataLoading = true;
      delete $rootScope.userSession;
      if (forced) {
        socket.emit('forceLogout', userSession.userObject.username);
        $window.location.reload();
      } else {
        $mdToast.show($mdToast.simple().textContent('Bye'));
        socket.emit('logout', userSession.userObject.username);
        $window.location.reload();
      }
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

    socket.on('alreadyLogged', () => {
      $mdToast.show($mdToast.simple().textContent('This account has been logged in another place, so let\'s close this section.'));
      vm.logout(true);
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
