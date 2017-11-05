'use strict';

(function () {
    'use strict';

    angular.module('app.home').factory('HomeService', HomeService);

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

(function () {
    'use strict';

    angular.module('app.login').factory('LoginService', LoginService);

    LoginService.$inject = ['$http'];

    function LoginService($http) {
        var service = {
            login: _login
        };

        return service;

        function _login(credential) {
            var headers = { 'Authorization': 'Basic ' + credential };
            return $http.get('/api/user/login', { headers: headers });
        }
    }
})();

(function () {
    'use strict';

    angular.module('app.register').factory('RegisterService', RegisterService);

    RegisterService.$inject = ['$http'];

    function RegisterService($http) {
        var service = {
            register: _register
        };

        return service;

        function _register(data) {
            return $http.post('/api/user/register', data);
        }
    }
})();