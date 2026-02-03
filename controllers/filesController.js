async function getFiles(req, res) {
    if (!req.user) {
        res.redirect('log-in');
    } else {
        res.render('files', {
            title: 'Files',
        });
    }
}

module.exports = { getFiles };