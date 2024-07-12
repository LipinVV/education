const express = require('express');
const fs = require("fs");
const fileMulter = require('../middleware/file-storage');
const { books } = require('../../books-store');
const { errorMessage, positiveMessage, uploadDirectory, uploadError, writeError, writeSuccess } = require('../../constants');
const Book = require("../Book/Book");

const allBooksRoute = '/api/books/';
const singleBookRoute = '/api/books/:id';

const bookIndexHandler = bookIndex => books.findIndex(book => book.id === bookIndex);

// скорее всего надо будет адаптировать get-запрос к получению файлов
// const uploadsDir = path.join(__dirname, '../../uploads');
// fs.readdir(uploadsDir, (err, files) => {
//     if (err) {
//         return console.error('Не удалось прочитать директорию:', err);
//     }
//
//     files.forEach(file => {
//         console.log(file);
//     });
// });

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
getBooks.get(allBooksRoute, (req, res) => {
    res.json(books);
});

// Get a book
const getBook = express.Router();
getBook.get(singleBookRoute, (req, res) => {
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
createBook.post(allBooksRoute, fileMulter.single('book'), (req, res) => {
    // автоматически не создаёт директорию, приходится проверять и создавать самому
    if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory);
    }

    if(req.file){
        const { path, filename } = req.file;
        const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
        const newBook = new Book(filename, description, authors, favorite, fileCover, fileName, fileBook);
        books.push(newBook);

        fs.writeFile(path, JSON.stringify(newBook), (err) => {
            if (err) {
                res.status(500).json({ error: writeError });
            } else {
                res.status(200).json({ message: `${writeSuccess}${path}` });
            }
        });
    } else {
        res.status(400).json({ error: uploadError });
    }
});

// Update a book
const updateBook = express.Router();
updateBook.put(singleBookRoute, (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const { id } = req.params;
    const bookIndex = bookIndexHandler(id);

    if (bookIndex !== -1){
        books[bookIndex] = {
            ...books[bookIndex],
            title, description, authors, favorite, fileCover, fileName,
        };

        res.json(books[bookIndex]);
    } else {
        res.status(404);
        res.json(errorMessage);
    }
});

// Delete a book
const deleteBook = express.Router();
deleteBook.delete(singleBookRoute, (req, res) => {
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
        getBooks,
        getBook,
        createBook,
        updateBook,
        deleteBook,
    },
};

module.exports = routes;
