'use strict';

angular.module('pocketFeederApp')
  .controller('LoginCtrl', function ($scope, $window) {
     var self = this;
     self.loginOauth = loginOauth;

     function loginOauth (provider) {
       $window.location.href = '/auth/' + provider;
     }
  });
