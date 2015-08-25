'use strict';

angular.module('pocketFeederApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('auth.nytimesSection', {
        url: '/nytimes/section/:section',
        templateUrl: 'app/nytimes/section/section.html',
        controller: 'NytimesSectionCtrl',
        controllerAs: 'ctrl',
        authenticate: true
      });
  });
