function postLogOut(req, res) {
    // log the user out
    res.redirect('log-in')
}

module.exports = { postLogOut };