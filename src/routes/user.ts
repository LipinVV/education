const express = require('express');
const router = express.Router();
const passport = require('passport');
const userDatabase = require('../userDatabase');
const { urlRoutes } = require('../constants');
const { loginRoute, userRoute, indexRoute, signupRoute, me, loginErrorRoute } = urlRoutes;
import { IExtendedRequest, IUserRecord } from "../interfaces";
import { NextFunction, Response } from 'express';

// Login
router.get(loginRoute, (req: IExtendedRequest, res: Response) => {
    res.render('login', { currentRoute: loginRoute, title: 'Логин', user: req.user });
});

router.get(loginErrorRoute, (req: IExtendedRequest, res: Response) => {
    res.render('loginError', { currentRoute: loginErrorRoute, title: 'Ошибка!', user: req.user });
});

router.post(loginRoute,
    passport.authenticate('local', { failureRedirect: userRoute + loginErrorRoute }),
    (req: IExtendedRequest, res: Response) => {
        res.redirect(indexRoute);
    }
);

router.get('/logout', (req: IExtendedRequest, res: Response, next: NextFunction) => {
    req.logout((err: unknown) => {
        if (err) {
            return next(err);
        }
        res.redirect(indexRoute);
    });
});

router.get(me,
    (req: IExtendedRequest, res: Response, next: NextFunction) => {
        if (!req.isAuthenticated()) {
            return res.redirect(userRoute + loginRoute);
        }
        next();
    },
    (req: IExtendedRequest, res: Response) => {
        res.render('profile', { user: req.user, currentRoute: me, title: 'Профиль' });
    }
);

// Signup
router.get(signupRoute, (req: IExtendedRequest, res: Response) => {
    res.render('signup', { currentRoute: signupRoute, title: 'Регистрация', user: req.user });
});

router.post(signupRoute, (req: IExtendedRequest, res: Response, next: NextFunction) => {
    const { username, password, email } = req.body;
    userDatabase.users.findByUsername(username, (err: unknown, user: IUserRecord) => {
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

        userDatabase.users.addUser(newUser, (err: unknown) => {
            if (err) {
                return next(err);
            }
            res.redirect(indexRoute);
        });
    });
});


module.exports = router;
