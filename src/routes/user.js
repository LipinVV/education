const express = require('express');
const router = express.Router();
const passport = require('passport');
const { urlRoutes } = require('../../constants');
const { loginRoute, userRoute, indexRoute } = urlRoutes;

// логин
router.get(loginRoute, (req, res) => {
    res.render('login');
});

router.post(loginRoute,
    passport.authenticate('local', { failureRedirect: userRoute + loginRoute }),
    (req, res) => {
        res.redirect(indexRoute);
    }
);

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect(indexRoute);
    });
});

router.get('/me',
    (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect(userRoute + loginRoute);
        }
        next();
    },
    (req, res) => {
        res.render('profile', { user: req.user });
    }
);

module.exports = router;
