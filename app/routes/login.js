// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/user/login');
}

module.exports = function(app, passport) {

    // PROFILE SECTION =========================
    app.get('/user/profile', isLoggedIn, function(req, res) {
        res.render('userprofile', {
            user: req.user
        });
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // instagram -------------------------------

    // send to facebook to do the authentication
    app.get('/auth/instagram', passport.authenticate('instagram', { scope: 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/instagram/callback',
        passport.authenticate('instagram', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));
};