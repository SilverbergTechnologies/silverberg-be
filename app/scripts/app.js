'use strict';

angular.module('silverbergApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap'
])
    .config(function ($stateProvider, $locationProvider, $httpProvider, $urlRouterProvider) {
        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: 'partials/main.html',
                controller: 'MainCtrl',
                authenticate: true
            })
            .state('login', {
                url: '/login',
                templateUrl: 'partials/login',
                controller: 'LoginCtrl'
            })
            .state('users.create', {
                url: '/create',
                templateUrl: 'partials/create-user',
                controller: 'createUserCtrl'
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'partials/settings',
                controller: 'SettingsCtrl',
                authenticate: true
            }).
            state('users', {
                url: '/users',
                templateUrl: 'partials/users',
                controller: 'UsersCtrl',
                authenticate: true
            }).
            state('users.detail', {
                url: '/:id',
                templateUrl: 'partials/user',
                controller: 'UserDetailCtrl',
                authenticate: true
            });

        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);

        // Intercept 401s and 403s and redirect you to login
        $httpProvider.interceptors.push(['$q', '$location', function ($q, $location) {
            return {
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        $location.path('/login');
                        return $q.reject(response);
                    }
                    else {
                        return $q.reject(response);
                    }
                }
            };
        }]);
    })
    .run(function ($rootScope, $location, Auth) {

        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function (event, next) {

            if (next.authenticate && !Auth.isLoggedIn()) {
                $location.path('/login');
            }
        });
    });