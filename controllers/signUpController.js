const { body, validationResult } = require('express-validator');
const passport = require('passport');
const { prisma } = require('../lib/prisma');
const bcrypt = require('bcryptjs');

const validateUsername = [
    body('username').trim().notEmpty().custom(async value => {
        const user = await prisma.user.findUnique({
            where : {
                username: value,
            },
        });
        if (user) {
            throw new Error('Username already in use');
        } else {
            return true;
        }
})];

const validatePassword = [
    body('password').custom((value, { req }) => {
        if (value === req.body.passwordAgain) {
            return true;
        } else {
            throw new Error('Passwords must match');
        }
    })
];

function getSignUp(req, res) {
    if (req.user) {
        res.redirect('/');
    } else {
        res.render('sign-up', {
            title: 'Sign Up',
        });
    }
}

async function postSignUp(req, res) {
    const {
        username, password
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('sign-up', {
            title: 'Sign Up',
            errors: errors.array(),
        })
    } else {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    username: username,
                    password: hashedPassword,
                    folders: {
                        create: {
                            name: username,
                        }
                    },
                },
            });
            res.redirect('/');
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = { validateUsername, validatePassword, getSignUp, postSignUp };