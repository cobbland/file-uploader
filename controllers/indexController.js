const { prisma } = require('../lib/prisma');

async function getIndex(req, res) {
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
        res.render('index', {
            title: 'File Uploader',
            username: req.user.username,
            folders: folders,
        });
    }
}

module.exports = { getIndex };