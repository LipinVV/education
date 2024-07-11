const express = require('express');
const { books } = require('../books-store');
const { errorMessage, positiveMessage } = require('../constants');
const Book = require("../src/Book/Book");

const bookIndexHandler = bookIndex => books.findIndex(book => book.id === bookIndex);

// User zone
const login = express.Router();
login.post('/api/user/login', (req, res) => {
    const userInfo = { id: 1, mail: "test@mail.ru" };
    res.json(userInfo);
    res.status(201);
});

// Books zone

// Get books
const getBooks = express.Router();
getBooks.get('/api/books/', (req, res) => {
    res.json(books);
});

// Get a book
const getBook = express.Router();
getBook.get('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = bookIndexHandler(id);

    if(bookIndex !== -1) {
        res.json(books[bookIndex]);
    } else {
        res.status(404);
        res.json(errorMessage);
    }
});

// Create a book
const createBook = express.Router();
createBook.post('/api/books/', (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName } = req.body;

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
    books.push(newBook);

    res.status(201);
    res.json(newBook);
});

// Update a book
const updateBook = express.Router();
updateBook.put('/api/books/:id', (req, res) => {
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

// Delete a book
const deleteBook = express.Router();
deleteBook.delete('/api/books/:id', (req, res) => {
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

const routes = {
    loginRoutes: login,
    booksRoutes: {
        getBooks: getBooks,
        getBook: getBook,
        createBook: createBook,
        updateBook: updateBook,
        deleteBook: deleteBook,
    },
};

module.exports = routes;
