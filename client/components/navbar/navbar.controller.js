'use strict';

angular.module('pocketFeederApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $window, $state) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.loginOauth = function (provider) {
      $window.location.href = '/auth/' + provider;
    };

    $scope.logout = function() {
      Auth.logout();
      $state.go('main.loggedOut');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
