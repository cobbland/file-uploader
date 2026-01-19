const express = require('express');
const router = express.Router();

function myLogger(req, res, next) {
    console.log(`logged ${req.params}`);
    next();
}

const requestTime = function (req, res, next) {
    req.requestTime = Date.now()
    next()
}

router.use(myLogger);
router.use(requestTime);

router.get('/all', (req, res) => {
    res.send("This should be a list of users...");
});

router.get('/:userID', (req, res, next) => {
    if (req.params.userID === 'secret') {
        return next('route');
    }
    res.send(`Welcome, ${req.params.userID}! (Request time: ${req.requestTime}.)`);
});

router.get('/:userID', (req, res) => {
    res.render('secret', {
        title: 'Secret Page',
        message: 'Welcome to the secret page.'
    });
});

module.exports = router;