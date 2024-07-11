const express = require('express');
const Book = require('./src/Book/Book');
const APP = express();
const BASIC_PORT = 3000;
const PORT = process.env.PORT || BASIC_PORT;
const HOST = '127.0.0.1';

// basic
APP.use(express.json());
// x-www-form-urlencoded
// APP.use(express.urlencoded({ extended: true }));

const store = {
    books: [
        new Book(title='Первая книга'),
        new Book(title='Вторая книга'),
    ],
};

const { books } = store;
const bookIndexHandler = bookIndex => books.findIndex(book => book.id === bookIndex);
const errorMessage = 'Книга не найдена';
const positiveMessage = 'ok';

APP.post('/api/user/login', (req, res) => {
    const userInfo = { id: 1, mail: "test@mail.ru" };
    res.json(userInfo);
    res.status(201);
});
APP.get('/api/books', (req, res) => {
    res.json(books);
});

APP.get('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = bookIndexHandler(id);

    if(bookIndex !== -1) {
        res.json(books[bookIndex]);
    } else {
        res.status(404);
        res.json(errorMessage);
    }
});

APP.post('/api/books/', (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName } = req.body;

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
    books.push(newBook);

    res.status(201);
    res.json(newBook);
});

APP.put('/api/books/:id', (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const { id } = req.params;
    const bookIndex = bookIndexHandler(id);

    if (bookIndex !== -1){
        books[bookIndex] = {
            ...books[bookIndex],
            title, description, authors, favorite, fileCover, fileName,
        }

        res.json(books[bookIndex]);
    } else {
        res.status(404);
        res.json(errorMessage);
    }
});

APP.delete('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = bookIndexHandler(id);

    if(bookIndex !== -1){
        books.splice(bookIndex, 1);
        res.json(positiveMessage);
    } else {
        res.status(404);
        res.json(errorMessage);
    }
});

APP.listen(PORT, HOST, () => console.log(`Server has started to work on: ${HOST}:${PORT}`));
