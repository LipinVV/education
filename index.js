const express = require('express');
const APP = express();
const BASIC_PORT = 3000;
const PORT = process.env.PORT || BASIC_PORT;
const HOST = '127.0.0.1';

const indexRouter = require('./src/routes/index');
const loginRouter = require('./src/routes/login');
const getBookRouter = require('./src/routes/get-book');
const getBooksRouter = require('./src/routes/get-books');
const downloadRouter = require('./src/routes/download-book');
const uploadRouter = require('./src/routes/upload-book');
const updateRouter = require('./src/routes/update-book');
const deleteRouter = require('./src/routes/delete-book');


APP.use('/', indexRouter); // базовый роут
APP.use('/', loginRouter); // логин
APP.use('/', getBookRouter); // выбрать книгу
APP.use('/', getBooksRouter); // выбрать все книги
APP.use('/', uploadRouter); // добавить книгу
APP.use('', downloadRouter); // скачать книгу
APP.use('/', updateRouter); // обновить книгу
APP.use('/', deleteRouter); // удалить книгу

APP.listen(PORT, HOST, () => console.log(`Server has started to work on: ${HOST}:${PORT}`));
