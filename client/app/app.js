'use strict';

angular.module('pocketFeederApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngMaterial',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdThemingProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');

    $mdThemingProvider.theme('default')
      .primaryPalette('pink')
      .accentPalette('orange');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $state, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      console.log(Auth.isLoggedIn());
      Auth.isLoggedInAsync(function(loggedIn) {
        console.log(next.authenticate, loggedIn, next);
        if (next.authenticate && !loggedIn) {
          $state.go('main.loggedOut');
        }
        if (loggedIn && next.name === 'main.loggedOut') {
          $state.go('main.loggedIn');
        }
      });
    });
  });
