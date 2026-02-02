const { body, validationResult } = require('express-validator');
const passport = require('passport');

const validateUsername = [
    body('username').trim().notEmpty()
];

function getLogIn(req, res) {
    if (req.user) {
        res.redirect('/');
    } else {
        res.render('log-in', {
            title: 'Log In',
        });
    }
}

const postLogIn = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
});

module.exports = { validateUsername, getLogIn, postLogIn };