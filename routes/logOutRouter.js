const express = require('express');
const router = express.Router();
const controller = require('../controllers/logOutController');

router.post('/', controller.postLogOut);

module.exports = router;