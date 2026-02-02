const { body, validationResult } = require('express-validator');
const passport = require('passport');
const { prisma } = require('../lib/prisma');

const validateUsername = [
    body('username').trim().notEmpty().custom(async value => {
        const user = await prisma.user.findUnique({
            where : {
                username: value,
            },
        });
        if (!user) {
            throw new Error('No such username or password');
        } else {
            return true;
        }
})];

function checkForErrors (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('log-in', {
            title: 'Log In',
            errors: errors.array(),
        })
    } else {
        next();
    }
}

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

module.exports = { validateUsername, checkForErrors, getLogIn, postLogIn };