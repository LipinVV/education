const express = require('express');
const axios = require('axios');
const router = express.Router();
const { errorMessage } = require('../../constants').dictionary;
const Book = require('../../models/Book');

const MAIN = '/';
const ID = '/:id';
const EDIT = '/edit';
const CREATE = '/create';
const BOOKS = '/books';
const DELETE = '/delete';
const COUNTER_API = process.env.COUNTER_API || 'http://counter:3003/counter';

// Get all books
router.get(MAIN, async (req, res) => {
    try {
        const books = await Book.find();
        res.render('books', { books: books, currentRoute: BOOKS, title: 'All Books' });
    } catch (error) {
        res.status(500).json(errorMessage);
    }
});

// Render create book page
router.get(CREATE, (req, res) => {
    const book = {
        title: '',
        description: '',
        authors: '',
        favourite: false,
    };
    res.render('create', { currentRoute: CREATE, book: book, title: 'New book' });
});

// Create a new book
router.post(CREATE, async (req, res) => {
    const { title, description, authors, favourite } = req.body;
    try {
        const bookCount = await Book.countDocuments(); // для подсчета количества документов в коллекции, соответствующих определенным критериям
        const newBook = new Book({
            title,
            description,
            authors,
            favourite: favourite === 'on',
            id: (bookCount + 1).toString(),
        });
        await newBook.save(); // нативный метод, который выполняет операцию записи в MongoDB
        res.redirect(BOOKS);
    } catch (error) {
        res.status(500).json(errorMessage);
    }
});

// Get book by id and increment counter
router.get(ID, async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findOne({ id });
        if (book) {
            try {
                const request = await axios.post(`${COUNTER_API}/${id}/incr`);
                const { data } = request;
                res.render('book', { book: book, currentRoute: '/book', viewData: data, title: book.title });
            } catch (error) {
                res.render('book', { book: book, currentRoute: '/book', viewData: 'N/A', title: 'Not found' });
            }
        } else {
            res.status(404).json(errorMessage);
        }
    } catch (error) {
        res.status(500).json(errorMessage);
    }
});

// Render edit book page
router.get(ID + EDIT, async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findOne({ id });
        if (book) {
            res.render('update', { book: book, currentRoute: EDIT, title: book.title });
        } else {
            res.status(404).json(errorMessage);
        }
    } catch (error) {
        res.status(500).json(errorMessage);
    }
});

// Update a book by id
router.post(ID + EDIT, async (req, res) => {
    const { title, description, authors, favourite } = req.body;
    const { id } = req.params;
    const isFavourite = favourite !== undefined && favourite.toString() === 'on';

    try {
        const book = await Book.findOneAndUpdate({ id }, {
            title,
            description,
            authors,
            favourite: isFavourite
        }, { new: true }); // без этой опции по умолчанию метод возвращает документ до обновления

        if (book) {
            res.redirect(`${BOOKS}/${id}`);
        } else {
            res.status(404).json(errorMessage);
        }
    } catch (error) {
        res.status(500).json(errorMessage);
    }
});

// Delete a book by id
router.get(ID + DELETE, async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findOneAndDelete({ id });
        if (book) {
            res.redirect(BOOKS);
            res.json('ok');
        } else {
            res.status(404).json(errorMessage);
        }
    } catch (error) {
        res.status(500).json(errorMessage);
    }
});

module.exports = router;
