const express = require("express");
const router = express.Router();
const { books } = require('../../books-store');
const { urlRoutes, dictionary } = require("../../constants");
const { singleBookRoute } = urlRoutes;
const { errorMessage } = dictionary;

router.put(singleBookRoute, (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
    const { id } = req.params;
    const bookIndex = books.findIndex(book => book.id === id);
    console.log(title)
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

module.exports = router;
