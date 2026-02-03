const express = require('express');
const router = express.Router();
const controller = require('../controllers/uploadFileController');
const multer  = require('multer');
const upload = multer({ dest: './uploads/' });

router.get('/', controller.getUploadFile);
router.post('/', upload.single('file'), controller.postUploadFile);

module.exports = router;