const express = require('express');
const router = express.Router();
const passport = require('passport');
const userDatabase = require('../../userDatabase');
const { urlRoutes } = require('../../constants');
const { loginRoute, userRoute, indexRoute, signupRoute, me, loginErrorRoute } = urlRoutes;

// Login
router.get(loginRoute, (req, res) => {
    res.render('login', { currentRoute: loginRoute, title: 'Логин', user: req.user });
});

router.get(loginErrorRoute, (req, res) => {
    res.render('loginError', { currentRoute: loginErrorRoute, title: 'Ошибка!', user: req.user });
});

router.post(loginRoute,
    passport.authenticate('local', { failureRedirect: userRoute + loginErrorRoute }),
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

router.get(me,
    (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect(userRoute + loginRoute);
        }
        next();
    },
    (req, res) => {
        res.render('profile', { user: req.user, currentRoute: me, title: 'Профиль', user: req.user });
    }
);

// Signup
router.get(signupRoute, (req, res) => {
    res.render('signup', { currentRoute: signupRoute, title: 'Регистрация', user: req.user });
});

router.post(signupRoute, (req, res, next) => {
    const { username, password, email } = req.body;
    userDatabase.users.findByUsername(username, (err, user) => {
        if (err) { return next(err); }
        if (user) {
            return res.redirect(userRoute + signupRoute + '?error=userexists');
        }

        const newUser = {
            id: userDatabase.users.allUsers.length + 1,
            username,
            password,
            displayName: username,
            emails: [{ value: email }],
        };

        userDatabase.users.addUser(newUser, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect(indexRoute);
        });
    });
});


module.exports = router;
