'use strict';

angular.module('pocketFeederApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        // url: '/',
        abstract: true,
        template: '<div ui-view=""></div>',
      })
      .state('main.loggedOut', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('main.loggedIn', {
        url: '/',
        templateUrl: 'app/main/loggedIn.html',
        controller: 'LoggedInCtrl',
        controllerAs: 'ctrl',
        authenticate: true
      });
  });
