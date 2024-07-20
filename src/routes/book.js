const express = require('express');
const router = express.Router();
const { errorMessage } = require('../../constants').dictionary;
const { books } = require('../../books-store');
const Book = require("../Book/Book");

const MAIN = '/';
const ID = '/:id';
const EDIT = '/edit';
const CREATE = '/create';
const BOOKS = '/books';

// Получить все книги
router.get(MAIN, (req, res) => {
    res.render('books', { books: books, currentRoute: BOOKS, title: 'Все книги' });
});

router.get(CREATE, (req, res) => {
    const book = {
        title: '',
        description: '',
        authors: '',
        favourite: false,
    };

    res.render('create', { currentRoute: CREATE, book: book });
});

router.post(CREATE, (req, res) => {
    const { title, description, authors, favourite } = req.body;
    const newId = (books.length + 1).toString();
    const newBook = new Book(title, description, authors, favourite, '', '', '', newId);
    books.push(newBook);

    res.redirect(BOOKS);
});


// Получить книгу по id
router.get(ID, (req, res) => {
    const { id } = req.params;
    const book = books.find(book => book.id === id);

    if (book) {
        res.render('book', { book: book, currentRoute: '/book' });
    } else {
        res.status(404).json(errorMessage);
    }
});

// Обновить книгу по id
router.get(ID + EDIT, (req, res) => {
    const { id } = req.params;
    const book = books.find(book => book.id === id);
    if (book) {
        res.render('update', { book: book, currentRoute: EDIT });
    } else {
        res.status(404).json(errorMessage);
    }
});

router.post(ID + EDIT, (req, res) => {
    const { title, description, authors, favourite } = req.body;
    const { id } = req.params;
    const bookIndex = books.findIndex(book => book.id === id);
    const isFavourite = favourite !== undefined && favourite.toString() === 'on';

    if (bookIndex !== -1) {
        books[bookIndex] = {
            ...books[bookIndex],
            title, description, authors, favourite: isFavourite,
        };

        res.redirect(`${BOOKS}/${id}`);
    } else {
        res.status(404).json(errorMessage);
    }
});


module.exports = router;
