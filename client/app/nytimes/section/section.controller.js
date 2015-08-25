'use strict';

angular.module('pocketFeederApp')
  .controller('NytimesSectionCtrl', function ($scope, $http, $state, $mdBottomSheet) {
    var self = this;
    self.articles = [];
    self.activeArticles = [];
    self.archive = archive;
    self.toggleArticle = toggleArticle;

    $http.get('/api/nytimes/' + $state.params.section)
    .then(function (r) {
      self.articles = r.data;
    });

    function archive () {
      $http.post('/api/pocket', {
        articles: self.activeArticles
      })
      .then(function (r) {
        console.log(r);
      });
    }

    function toggleArticle (article) {
      if (article.active) {
        self.activeArticles = _.filter(self.activeArticle, function (a) {
          return article.url !== a.url;
        });
      } else {
        self.activeArticles.push(article);
      }
      article.active = !article.active;
    }


  });
