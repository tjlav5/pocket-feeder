'use strict';

var _ = require('lodash');
var Pocket = require('./pocket.model');
var request = require('request');
var config = require('../../config/environment');

// Get list of pockets
exports.index = function(req, res) {
  Pocket.find(function (err, pockets) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(pockets);
  });
};

// Get a single pocket
exports.show = function(req, res) {
  Pocket.findById(req.params.id, function (err, pocket) {
    if(err) { return handleError(res, err); }
    if(!pocket) { return res.status(404).send('Not Found'); }
    return res.json(pocket);
  });
};

// Creates a new pocket in the DB.
exports.create = function(req, res) {
  console.log(req.body.length);
  console.log(req.user);
  var articles = [];
  _.forEach(req.body, function (url) {
    articles.push({
      action: 'add',
      url: url
    });
  });
  request({
    url: 'https://getpocket.com/v3/send',
    qs: {
      consumer_key: config.pocket.clientSecret,
      access_token: req.user.pocket.accessToken,
      actions: JSON.stringify(articles)
    }
  }, function (err, r, body) {
    console.log(r.request);
    res.status(200).send(body);
  });
};

// Updates an existing pocket in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Pocket.findById(req.params.id, function (err, pocket) {
    if (err) { return handleError(res, err); }
    if(!pocket) { return res.status(404).send('Not Found'); }
    var updated = _.merge(pocket, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(pocket);
    });
  });
};

// Deletes a pocket from the DB.
exports.destroy = function(req, res) {
  Pocket.findById(req.params.id, function (err, pocket) {
    if(err) { return handleError(res, err); }
    if(!pocket) { return res.status(404).send('Not Found'); }
    pocket.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
