module.exports = function isCompany(req, res, next) {
    if (req.session.user_type == 'company-admin' || req.session.user_type == 'company') {
        return next();
    }

    if (req.wantsJSON) {
        return res.forbidden('You are not permitted to perform this action.');
    }
    return res.redirect('/login');
};