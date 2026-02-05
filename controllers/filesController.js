const { prisma } = require('../lib/prisma');

async function getFiles(req, res) {
    if (!req.user) {
        res.redirect('log-in');
    } else {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    username: req.user.username,
                }
            });
            const folders = await prisma.folder.findMany({
                where: {
                    userId: user.id,
                    parent: null,
                },
            });
            res.render('files', {
                title: 'Files',
                folders: folders,
            });
        } catch(err) {
            console.log(err.message);
            res.status(404).send(
                `The planet you're searching for doesn't exist: ${req.url}`
            );
        }
    }
}

async function getFolder(req, res) {
    try {
        const folder = await prisma.folder.findUnique({
            where: {
                id: +req.params.folderId,
            },
        });
        const user = await prisma.user.findUnique({
            where: {
                username: req.user.username,
            }
        });
        const folders = await prisma.folder.findMany({
            where: {
                parentId: +req.params.folderId,
            },
        });
        const files = await prisma.file.findMany({
            where: {
                folderId: +req.params.folderId,
            },
        });
        if (folder.userId === user.id) {
            res.render('files', {
                title: 'Files',
                folder: folder,
                folders: folders,
                files: files,
            });
        } else {
            res.send('Access denied!');
        }
    } catch(err) {
        res.status(404).send(
            `The planet you're searching for doesn't exist: ${req.url}`
        );
    }
}

async function postCreateFolder(req, res) {

}

async function postEditFolder(req, res) {

}

async function postDeleteFolder(res, res) {

}

async function postUploadFile(req, res) {
    res.redirect(`/files/${req.body.folder}`);
}

module.exports = { getFiles, getFolder, postCreateFolder, postEditFolder, postDeleteFolder, postUploadFile };