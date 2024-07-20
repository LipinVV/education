const express = require('express');
const router = express.Router();
const { errorMessage, positiveMessage } = require('../../constants').dictionary;
const { books } = require('../../books-store');
const Book = require("../Book/Book");

const MAIN = '/';
const ID = '/:id';

// Получить все книги
router.get(MAIN, (req, res) => {
    res.render('books', { books: books, currentRoute: '/books', title: 'Все книги' });
});

router.get('/create', (req, res) => {
    const book = {
        title: '',
        description: '',
        authors: '',
        favourite: false,
    };

    res.render('create', { currentRoute: '/create', book: book });
});

router.post('/create', (req, res) => {
    const { title, description, authors, favourite } = req.body;
    const newId = (books.length + 1).toString();
    const newBook = new Book(title, description, authors, !!favourite, '', '', '', newId);
    books.push(newBook);

    res.redirect('/books');
});


// Получить книгу по id
router.get(ID, (req, res) => {
    const { id } = req.params;
    const book = books.find(book => book.id === id);
    console.log(id, typeof id, books)
    if (book) {
        res.render('book', { book: book, currentRoute: '/book' });
    } else {
        res.status(404).json(errorMessage);
    }
});

// // Удалить книгу по id
// router.delete(ID, (req, res) => {
//     const { id } = req.params;
//     const bookIndex = books.findIndex(book => book.id === id);
//
//     if (bookIndex !== -1) {
//         books.splice(bookIndex, 1);
//         res.json(positiveMessage);
//     } else {
//         res.status(404).json(errorMessage);
//     }
// });
//
// // Обновить книгу по id
// router.put(ID, (req, res) => {
//     const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
//     const { id } = req.params;
//     const bookIndex = books.findIndex(book => book.id === id);
//
//     if (bookIndex !== -1){
//         books[bookIndex] = {
//             ...books[bookIndex],
//             title, description, authors, favorite, fileCover, fileName, fileBook,
//         };
//
//         res.json(books[bookIndex]);
//     } else {
//         res.status(404);
//         res.json(errorMessage);
//     }
// });

module.exports = router;
