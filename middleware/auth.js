module.exports = {
    ensureAuth: function (req,res,next) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.direct('/')
        }
    },
    ensureGuest: function (req,res,next) {
        if (!req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/')
        }
    }
}