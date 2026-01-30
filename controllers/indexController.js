function getIndex(req, res) {
    if (!req.user) {
        res.redirect('log-in');
    } else {
        res.render('index', {
            title: 'File Uploader',
            username: req.user.username,
        });
    }
}

module.exports = { getIndex };