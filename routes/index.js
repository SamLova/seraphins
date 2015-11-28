/* global __dirname */

var express = require('express');
var session = require('express-session');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' , name : session.name});
});

router.get('/admin', function(req,res){
    res.render('admin/index');
});

module.exports = router;
