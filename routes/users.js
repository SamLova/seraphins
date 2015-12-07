var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); // mongo connection
var bodyParser = require('body-parser');
var methodOverride = require('method-override'); // used to manipulate POST

// Load model for user
var user = require('../lib/controllers/users');

router.use(bodyParser.urlencoded({ extended : true }));
router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        //look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));


router.get('/new', function(req, res){
    res.render('users/new');
});

router.post('/', user.create);

router.get('/api/users', function(req, res){
  res.send('/api/users', user.create);
});

router.ge
module.exports = router;