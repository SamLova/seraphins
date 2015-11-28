var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); // mongo connection
var bodyParser = require('body-parser');
var methodOverride = require('method-override'); // used to manipulate POST

