'use strict';

var _ = require('lodash');
var Nytimes = require('./nytimes.model');
var request = require('request');
var config = require('../../config/environment');

// Get list of nytimess
exports.index = function(req, res) {
  var sections = [
    {name: 'Home', type: 'home'},
    {name: 'World', type: 'world'},
    {name: 'National', type: 'national'},
    {name: 'Politics', type: 'politics'},
    {name: 'NY Region', type: 'nyregion'},
    {name: 'Business', type: 'business'},
    {name: 'Opinion', type: 'opinion'},
    {name: 'Technology', type: 'technology'},
    {name: 'Science', type: 'science'},
    {name: 'Health', type: 'health'},
    {name: 'Sports', type: 'sports'},
    {name: 'Arts', type: 'arts'},
    {name: 'Fashion', type: 'fashion'},
    {name: 'Dining', type: 'dining'},
    {name: 'Travel', type: 'travel'},
    {name: 'Magazine', type: 'magazine'},
    {name: 'Real Estate', type: 'realestate'}
  ];
  res.status(200).json(sections);
};

// Get a single nytimes
exports.show = function(req, res) {
  var urlList = [];
  request({
    uri: 'http://api.nytimes.com/svc/topstories/v1/' + req.params.id + '.json',
    qs: {
      'api-key': config.nyt.accessToken
    },
    proxy: false,
    json: true
  }, function (error, response, body) {
    res.status(200).json(body.results);
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
