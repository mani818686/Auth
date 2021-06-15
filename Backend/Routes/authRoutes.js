var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleURL,FacebookURL;
require('../passport/passport-local').passport;
require('../passport/passport-google').passport;
require('dotenv').config(); 

if(process.env.PRODUCTION) {
    console.log("Production");
    GoogleURL = process.env.GOOGLE_CALLBACK_URL1;
}else {
    console.log("Development");
    GoogleURL = process.env.GOOGLE_CALLBACK_URL;
}

router.post('/auth/login', 
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
}));

router.get('/auth/google', 
    passport.authenticate('google', { scope: ['profile','email'] })
);

router.get(GoogleURL, 
    passport.authenticate('google', {
        successRedirect : '/dashboard',
        failureRedirect: '/login', 
        failureFlash: true
}));

module.exports = router;