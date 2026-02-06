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
            const files = null; // TKTK
            res.render('files', {
                title: 'Files',
                folders: folders,
                files: files | null,
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
    const user = await prisma.user.findUnique({
        where : {
            username: req.user.username,
        },
    });
    const folder = await prisma.folder.create({
        data: {
            name: req.body.newFolder,
            userId: user.id,
            parentId: +req.body.folder || null,
        },
    });
    res.redirect(`/files/${req.body.folder}`);
}

async function postEditFolder(req, res) {
    const folder = await prisma.folder.update({
        where: {
            id: +req.params.folderId,
        },
        data: {
            name: req.body.renamedFolder,
        }
    });
    res.redirect(`/files/${req.params.folderId}`);
}

async function postDeleteFolder(req, res) {
    const deleteFolders = await prisma.folder.deleteMany({
        where: {
            parentId: +req.params.folderId,
        },
    });
    const deleteFiles = null; //TKTK
    const deleteFolder = await prisma.folder.deleteMany({
        where: {
            id: +req.params.folderId,
        },
    });
    res.redirect('/files');
}

async function postUploadFile(req, res) {
    res.redirect(`/files/${req.body.folder}`);
}

module.exports = { getFiles, getFolder, postCreateFolder, postEditFolder, postDeleteFolder, postUploadFile };