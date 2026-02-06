const express = require('express');
const router = express.Router();
const controller = require('../controllers/filesController');
const multer  = require('multer');
const upload = multer({ dest: './uploads/' });

router.get('/', controller.getFiles);
router.get('/:folderId', controller.getFolder);
router.post('/upload-file', upload.single('file'), controller.postUploadFile);
router.post('/create-folder', controller.postCreateFolder);
router.post('/:folderId/edit-folder', controller.postEditFolder);
router.post('/:folderId/delete-folder', controller.postDeleteFolder);

module.exports = router;