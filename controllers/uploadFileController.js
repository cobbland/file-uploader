const { prisma } = require('../lib/prisma');

async function getUploadFile(req, res) {
    if (!req.user) {
        res.redirect('log-in');
    } else {
        const user = await prisma.user.findUnique({
            where: {
                username: req.user.username,
            },
        });
        const folders = await prisma.folder.findMany({
            where: {
                userId: user.id,
            }
        });
        res.render('upload-file', {
            title: 'Upload File',
            username: req.user.username,
            folders: folders,
        });
    }
}

async function postUploadFile(req, res, next) {
    res.redirect('/');
}

module.exports = { getUploadFile, postUploadFile };