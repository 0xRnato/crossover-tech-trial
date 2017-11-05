'use strict';

(function () {
    'use strict';

    angular.module('app', ['ngRoute', 'app.routes', 'app.login', 'app.register', 'app.home', 'ngMaterial', 'angular-encryption', 'base64']);

    angular.module('app.routes', []);
    angular.module('app.login', []);
    angular.module('app.register', []);
    angular.module('app.home', []);
})();

(function () {
    'use strict';

    angular.module('app').config(mainConfig);

    mainConfig.$inject = ['$mdThemingProvider'];

    function mainConfig($mdThemingProvider) {
        $mdThemingProvider.theme('default').primaryPalette('blue-grey').accentPalette('grey');
    }
})();

(function () {
    'use strict';

    angular.module('app.routes').config(RoutesConfig);

    RoutesConfig.$inject = ['$routeProvider', '$locationProvider'];

    function RoutesConfig($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider.when('/', {
            templateUrl: 'views/login.html',
            controller: 'LoginController',
            controllerAs: 'loginController'
        }).when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController',
            controllerAs: 'registerController'
        }).when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeController',
            controllerAs: 'homeController'
        }).otherwise({ redirectTo: '/' });
    }
})();

(function () {
    'use strict';

    angular.module('app').run(runBlock);

    runBlock.$inject = ['$rootScope', '$location'];

    function runBlock($rootScope, $location) {
        $rootScope.$on('$locationChangeStart', function () {
            var restrictedPage = $location.path() == '/home';
            var loggedIn = $rootScope.userSession;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }
})();