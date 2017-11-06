(function () {
  'use strict';

  angular
    .module('app.socket')
    .factory('socket', socket)

  socket.$inject = ['$rootScope'];

  function socket($rootScope) {
    const socket = io.connect();
    const service = {
      on: _on,
      emit: _emit,
      disconnect: _disconnect
    };

    return service;

    function _on(eventName, callback) {
      socket.on(eventName, function () {
        const args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    }

    function _emit(eventName, data, callback) {
      socket.emit(eventName, data, function () {
        const args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }

    function _disconnect() {
      socket.disconnect();
    }
  }
})();
