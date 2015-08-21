'use strict';

var express = require('express');
var controller = require('./session.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.delete('/', controller.destroy);

module.exports = router;
