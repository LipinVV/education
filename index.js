const express = require('express');
const APP = express();
const mongoConnector = require('./src/service/mongo');

const indexRouter = require('./src/routes/index');
const userRouter = require('./src/routes/user');
const bookRouter = require('./src/routes/book');
const bodyParser = require("express");
const path = require("path");
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userDatabase = require('./userDatabase');

const { urlRoutes } = require('./constants');
const { allBooksRoute, indexRoute, userRoute } = urlRoutes;
const BASIC_PORT = 3000;
const PORT = process.env.PORT || BASIC_PORT;

const verify = (username, password, done) => {
    userDatabase.users.findByUsername(username, (err, user) => {
        if (err) {return done(err)}
        if (!user) { return done(null, false) }

        if( !userDatabase.users.verifyPassword(user, password)) {
            return done(null, false)
        }

        return done(null, user)
    })
};

const options = {
    usernameField: "username",
    passwordField: "password",
};

passport.use('local', new LocalStrategy(options, verify));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser( (id, cb) => {
    userDatabase.users.findById(id,  (err, user) => {
        if (err) { return cb(err) }
        cb(null, user)
    });
});

APP.use(express.json());

APP.use(session({ secret: 'SECRET' }));
APP.use(passport.initialize());
APP.use(passport.session());

// это должно быть подключено РАНЬШЕ ЧЕМ РОУТЫ, иначе в req.body будут undefined
APP.use(express.urlencoded({ extended: true }));
APP.use(bodyParser.json());
APP.use(express.static(path.join(__dirname, 'public')));

// EJS setup
APP.set('views', path.join(__dirname, '/src/views'));
APP.set('view engine', 'ejs');

APP.use(indexRoute, indexRouter); // основной
APP.use(allBooksRoute, bookRouter); // обобщение для работы с книгами
APP.use(userRoute, userRouter); // обобщение для пользователя

mongoConnector();

APP.listen(PORT, () => {
    console.log(`Server has started to work on: ${PORT}`)
});
