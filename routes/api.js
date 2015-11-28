var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); // mongo connection
var bodyParser = require('body-parser'),
    fs = require('fs'),
    path = require('path');
var methodOverride = require('method-override'); // used to manipulate POST


var controllersPath = path.join(__dirname, '../lib/controllers');
var userController = require(path.join(controllersPath, 'users'));
router.get('/users', userController.all);
router.get('/users/:username', userController.exists);
router.get('/users/:userId/show', userController.show);

module.exports = router;