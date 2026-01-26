function indexControls(req, res) {
    res.render('log-in', {
        title: 'Log In',
    });
}

module.exports = { indexControls, };