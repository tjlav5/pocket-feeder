'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', passport.authenticate('pocket'))

  .get('/callback', passport.authenticate('pocket', {
    failureRedirect: '/'
  }), auth.setTokenCookie);

module.exports = router;
