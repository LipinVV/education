const express = require('express');
const router = express.Router();
const fs = require("fs");
const { errorMessage, positiveMessage } = require('../../constants').dictionary;
const { books } = require('../../books-store');
const fileMulter = require("../middleware/file-storage");

const MAIN = '/';
const ID = '/:id';
const DOWNLOAD = '/download';
const UPLOAD = 'upload';
const bookKey = 'book';

// Получить все книги
router.get(MAIN, (req, res) => {
    res.json(books);
});

if (!fs.existsSync(UPLOAD)) {
    fs.mkdirSync(UPLOAD);
}

// Получить книгу по id
router.get(ID, (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex !== -1) {
        res.json(books[bookIndex]);
    } else {
        res.status(404).json(errorMessage);
    }
});

// Удалить книгу по id
router.delete(ID, (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.json(positiveMessage);
    } else {
        res.status(404).json(errorMessage);
    }
});

// Обновить книгу по id
router.put(ID, (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
    const { id } = req.params;
    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex !== -1){
        books[bookIndex] = {
            ...books[bookIndex],
            title, description, authors, favorite, fileCover, fileName, fileBook,
        };

        res.json(books[bookIndex]);
    } else {
        res.status(404);
        res.json(errorMessage);
    }
});

// Загрузить книгу
router.post(MAIN + UPLOAD, fileMulter.single(bookKey), (req, res) => {
    if (req.file) {
        const { path, originalname, filename } = req.file;
        const { title, description, authors, favorite, fileCover } = req.body;
        const ONE = 1;
        const bookCounter = books.length > 0 ? books.length + ONE : ONE;
        const bookNameFiller = `Книга №${bookCounter}`;

        const newBook = {
            id: filename,
            title: title ? title : bookNameFiller,
            description: description ? description : '',
            authors: authors ? authors : '',
            favorite: favorite ? favorite : '',
            fileCover: fileCover ? fileCover : '',
            fileName: originalname,
            fileBook: path,
        };
        books.push(newBook);
        res.json({ path });
    } else {
        res.status(400).json({ error: "File not uploaded" });
    }
});

// Скачать книгу по id
router.get(ID + DOWNLOAD, (req, res) => {
    const { id } = req.params;
    const book = books.find(book => book.id === id);

    if (book) {
        const filePath = book.fileBook;
        res.download(filePath, book.fileName);
    } else {
        res.status(404).json({ error: "Book not found" });
    }
});


module.exports = router;
