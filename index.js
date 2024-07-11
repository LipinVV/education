const express = require('express');
const APP = express();
const BASIC_PORT = 3000;
const PORT = process.env.PORT || BASIC_PORT;
const HOST = '127.0.0.1';

const indexRouter = require('./src/routes/index');
const mainRoutingValue = '/'; // дополнительный префикс, можно дополнить маршрут

APP.use(express.json());

APP.use(mainRoutingValue, indexRouter.booksRoutes.getBooks);
APP.use(mainRoutingValue, indexRouter.booksRoutes.getBook);
APP.use(mainRoutingValue, indexRouter.booksRoutes.updateBook);
APP.use(mainRoutingValue, indexRouter.booksRoutes.createBook);
APP.use(mainRoutingValue, indexRouter.booksRoutes.deleteBook);

APP.listen(PORT, HOST, () => console.log(`Server has started to work on: ${HOST}:${PORT}`));
