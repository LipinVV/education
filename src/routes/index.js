const express = require('express');
const fs = require("fs");
const path = require("path");
const fileMulter = require('../middleware/file-storage');
const { books } = require('../../books-store');
const { dictionary, urlRoutes } = require('../../constants');
const { errorMessage, positiveMessage, uploadDirectory, uploadError, writeError, writeSuccess } = dictionary;
const { allBooksRoute, downloadBookRoute, loginRoute, singleBookRoute } = urlRoutes;
const Book = require("../Book/Book");

const bookIndexHandler = bookIndex => books.findIndex(book => book.id === bookIndex);

const errorStatusHandler = response => {
    response.status(404);
    response.json(errorMessage);
}

// User zone
const login = express.Router();
login.post(loginRoute, (req, res) => {
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
        errorStatusHandler(res);
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
        errorStatusHandler(res);
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
        errorStatusHandler(res);
    }
});

// Download a book
const downloadBook = express.Router();
downloadBook.get(downloadBookRoute, (req, res) => {
    const { id } =  req.params;
    const filePath = path.join(__dirname, '../../uploads', `${id}.txt`);

    res.download(filePath, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).json({ message: errorMessage });
            } else {
                return res.status(500).json({ message: uploadError, error: err });
            }
        }
    });
});

const routes = {
    loginRoutes: login,
    booksRoutes: {
        getBooks,
        getBook,
        createBook,
        updateBook,
        deleteBook,
        downloadBook,
    },
};

module.exports = routes;
