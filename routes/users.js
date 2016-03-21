var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/register', function(req, res, next){
    res.render('register', {
        'title': 'Register'
    });
});

router.get('/signin', function(req, res, next){
    res.render('signin', {
        'title': 'Sign In'
    });
});

module.exports = router;
