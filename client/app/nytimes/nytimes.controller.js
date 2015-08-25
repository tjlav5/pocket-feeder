'use strict';

angular.module('pocketFeederApp')
  .controller('NytimesCtrl', function ($scope, $http) {
    var self = this;
    self.sections = [];

    $http.get('/api/nytimes')
    .then(function (r) {
      self.sections = r.data;
    });
  });
