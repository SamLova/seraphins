var express = require('express');
var session = require('express-session');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res) {
//    res.sendFile
    res.render('index', { title: 'Express'});
});

module.exports = router;
