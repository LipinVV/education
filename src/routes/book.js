const express = require('express');
const axios = require('axios');
const router = express.Router();
const { errorMessage } = require('../../constants').dictionary;
const { books } = require('../../books-store');
const Book = require("../Book/Book");

const MAIN = '/';
const ID = '/:id';
const EDIT = '/edit';
const CREATE = '/create';
const BOOKS = '/books';
const COUNTER_API = process.env.COUNTER_API || 'http://counter:3003/counter';

// Get all books
router.get(MAIN, (req, res) => {
    res.render('books', { books: books, currentRoute: BOOKS, title: 'All Books' });
});

// Render create book page
router.get(CREATE, (req, res) => {
    const book = {
        title: '',
        description: '',
        authors: '',
        favourite: false,
    };
    res.render('create', { currentRoute: CREATE, book: book });
});

// Create a new book
router.post(CREATE, (req, res) => {
    const { title, description, authors, favourite } = req.body;
    const newId = (books.length + 1).toString();
    const newBook = new Book(title, description, authors, favourite, '', '', '', newId);
    books.push(newBook);
    res.redirect(BOOKS);
});

// Get book by id and increment counter
router.get(ID, async (req, res) => {
    const { id } = req.params;
    const book = books.find(book => book.id === id);
    if (book) {
        try {
            const request  = await axios.post(`${COUNTER_API}/${id}/incr`);
            const { data } = request;
            res.render('book', { book: book, currentRoute: '/book', viewData: data });
        } catch (error) {
            res.render('book', { book: book, currentRoute: '/book', viewData: 'N/A' });
        }
    } else {
        res.status(404).json(errorMessage);
    }
});

// Render edit book page
router.get(ID + EDIT, (req, res) => {
    const { id } = req.params;
    const book = books.find(book => book.id === id);
    if (book) {
        res.render('update', { book: book, currentRoute: EDIT });
    } else {
        res.status(404).json(errorMessage);
    }
});

// Update a book by id
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
