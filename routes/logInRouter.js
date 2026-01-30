const express = require('express');
const router = express.Router();
const controller = require('../controllers/logInController');

router.get('/', controller.getLogIn);
router.post('/', controller.validateUsername, controller.postLogIn);

module.exports = router;