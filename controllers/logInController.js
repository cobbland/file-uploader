const { body, validationResult } = require('express-validator');
const passport = require('passport');
const { prisma } = require('../lib/prisma');

const validateUsername = [
    body('username').trim().notEmpty()
];

function getLogIn(req, res) {
    if (req.user) {
        res.redirect('/');
    } else {
        if (req.session.messages) {
            res.render('log-in', {
                title: 'log-in',
                errors: ['Incorrect username or password'],
            });
        } else {
            res.render('log-in', {
                title: 'Log In',
            });
        }
    }
}

const postLogIn = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
    failureMessage: true,
});

module.exports = { validateUsername, getLogIn, postLogIn };