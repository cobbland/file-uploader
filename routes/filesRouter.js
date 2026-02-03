const express = require('express');
const router = express.Router();
const controller = require('../controllers/filesController');

router.get('/', controller.getFiles);
router.get('/:folderId', controller.getFolder);

module.exports = router;