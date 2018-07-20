module.exports = function isAdmin(req, res, next) {
    if (req.session.admin === true) {
        return next();
    }

    if (req.wantsJSON) {
        return res.forbidden('You are not permitted to view this page.');
    }
    return res.redirect('/');
};