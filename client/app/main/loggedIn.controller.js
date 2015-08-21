'use strict';

angular.module('pocketFeederApp')
  .controller('LoggedInCtrl', function ($scope, $http, socket) {
    var self = this;
    self.sections = [];
    self.archive = archive;

    $scope.articles = [];

    $http.get('/api/nytimes').then(function(r) {
      self.sections = r.data;
    });

    function archive () {
      angular.forEach(self.sections, function (section) {
        console.log(section);
        if (section.active) {
          $http.get('/api/nytimes/' + section.type).then (function (r) {
            $http.post('/api/pocket', r.data);
          });
        }
      });
    }

  });
