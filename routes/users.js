var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a MEME: this page is a 7/10, too much water');
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

router.post('/register', function(req, res, next){
    // Get values from Form
    // Name of var is 'name' from post req
    var name = req.body.name;
    // Name of var is 'email' from post req
    var email = req.body.email;
    // ...
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    // To get file we check image field first
    if(req.files && req.files.profilePicture){
        consle.log('Uploading an image!');
        var pic = req.files.profilePicture;
        // File information
        var picName = pic.originalname;
        var picServerName = pic.name;
        var picMime = pic.mimetype;
        var picPath = pic.path;
        var picExt = pic.extension;
        var picSize = pic.size;
    } else {
        // Set a Default profile picture
        var picName = 'nopicture.jpg';
    }

    // Form Validation using express validator
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Valid email is required').notEmpty().isEmail();
    req.checkBody('username', 'A username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(password);

    // Check for errors
    var errors = req.validationErrors();

    if(errors){
        res.render('register', {
            errors: errors,
            name: name,
            email: email,
            username: username,
            password: password,
            password2: password2
        });
    } else {
        var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password,
            profilePicture: picName
        });

        // Create user using Model
        // User.createUser(newUser, function(err, user){
        //     if(err) throw err;
        //     console.log(user);
        // });
        console.log('User created: ' + newUser);
        // Success Flash Message
        req.flash('success', 'You are now registered and may log in!');

        res.location('/');
        res.redirect('/');
    }
});
module.exports = router;
