'use strict';

var _ = require('lodash');
var Nytimes = require('./nytimes.model');
var request = require('request');
var config = require('../../config/environment');

// Get list of nytimess
exports.index = function(req, res) {
  var sections = [
    {type: 'home'},
    {type: 'world'},
    {type: 'national'},
    {type: 'politics'},
    {type: 'nyregion'},
    {type: 'business'},
    {type: 'opinion'},
    {type: 'technology'},
    {type: 'science'},
    {type: 'health'},
    {type: 'sports'},
    {type: 'arts'},
    {type: 'fashion'},
    {type: 'dining'},
    {type: 'travel'},
    {type: 'magazine'},
    {type: 'realestate'}
  ];
  res.status(200).json(sections);
  // var urlList = [];
  // request({
  //   json: true
  // }, function (error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     _.forEach(body.results, function (story) {
  //       urlList.push(story.url);
  //     });
  //     res.status(200).json(urlList);
  //     // console.log(body) // Show the HTML for the Google homepage.
  //   }
  // });
};

// Get a single nytimes
exports.show = function(req, res) {
  var urlList = [];
  request({
    url: 'http://api.nytimes.com/svc/topstories/v1/' + req.params.id + '.json?api-key=' + config.nyt.accessToken,
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      _.forEach(body.results, function (story) {
        urlList.push(story.url);
      });
      res.status(200).json(urlList);
      // console.log(body) // Show the HTML for the Google homepage.
    }
  });
};

// Creates a new nytimes in the DB.
exports.create = function(req, res) {
  Nytimes.create(req.body, function(err, nytimes) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(nytimes);
  });
};

// Updates an existing nytimes in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Nytimes.findById(req.params.id, function (err, nytimes) {
    if (err) { return handleError(res, err); }
    if(!nytimes) { return res.status(404).send('Not Found'); }
    var updated = _.merge(nytimes, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(nytimes);
    });
  });
};

// Deletes a nytimes from the DB.
exports.destroy = function(req, res) {
  Nytimes.findById(req.params.id, function (err, nytimes) {
    if(err) { return handleError(res, err); }
    if(!nytimes) { return res.status(404).send('Not Found'); }
    nytimes.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
