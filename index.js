const express = require('express');
const APP = express();
const BASIC_PORT = 3000;
const PORT = process.env.PORT || BASIC_PORT;

const indexRouter = require('./src/routes/index');
const userRouter = require('./src/routes/user');
const bookRouter = require('./src/routes/book');
const { urlRoutes } = require('./constants');
const bodyParser = require("express");
const path = require("path");
const { allBooksRoute, indexRoute, userRoute } = urlRoutes;

APP.use(express.json());
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

APP.listen(PORT, () => console.log(`Server has started to work on: ${PORT}`));
