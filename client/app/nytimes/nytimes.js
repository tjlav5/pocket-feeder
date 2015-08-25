'use strict';

angular.module('pocketFeederApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('auth.nytimes', {
        url: '/nytimes',
        templateUrl: 'app/nytimes/nytimes.html',
        controller: 'NytimesCtrl',
        controllerAs: 'ctrl',
        authenticate: true
      });
  });
