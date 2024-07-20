const express = require('express');
const APP = express();
const BASIC_PORT = 3000;
const PORT = process.env.PORT || BASIC_PORT;
const HOST = '127.0.0.1';

const indexRouter = require('./src/routes/index');
const userRouter = require('./src/routes/user');
const bookRouter = require('./src/routes/book');
const { urlRoutes } = require('./constants');
const { allBooksRoute, indexRoute, userRoute } = urlRoutes;

APP.use(express.json());

APP.use(indexRoute, indexRouter); // основной
APP.use(allBooksRoute, bookRouter); // обобщение для работы с книгами
APP.use(userRoute, userRouter); // обобщение для пользователя

APP.listen(PORT, HOST, () => console.log(`Server has started to work on: ${HOST}:${PORT}`));
