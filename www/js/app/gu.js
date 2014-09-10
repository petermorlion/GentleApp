/* We're using 'gu' as app name here, to avoid confusion with the global app variable that Cordova generated. 'gu' is for Gentle Ultimate */
(function () {
    'use strict';
    var gu = angular.module('gu', [
    
        // Angular modules
        'ngAnimate', // animations
        'ngRoute', // routing
        'ngTouch', // touch support for Angular
    ]);
        
    gu.run(['$route', function ($route) {
        // Include $route to kick start the router.
    }]);
    
    var config = {
    };
    gu.value('config', config);
    
    // Collect the routes
    gu.constant('routes', getRoutes());
    // Configure the routes and route resolvers
    gu.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {
        routes.forEach(function (r) {
            $routeProvider.when(r.url, { templateUrl: r.templateUrl });
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }
    // Define the routes
    function getRoutes() {
        return [
            {
                url: '/',
                templateUrl: '/js/app/main/main.html'
            }, {
                url: '/main',
                templateUrl: '/js/app/main/main.html'
            }, {
                url: '/settings',
                templateUrl: '/js/app/settings/settings.html'
            }
        ];
    }
    
})();