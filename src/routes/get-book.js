const express = require("express");
const router = express.Router();
const {urlRoutes, dictionary} = require("../../constants");
const { singleBookRoute } = urlRoutes;
const { books } = require('../../books-store');
const { errorMessage } = dictionary;

router.get(singleBookRoute, (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex(book => book.id === id);

    if(bookIndex !== -1) {
        res.json(books[bookIndex]);
    } else {
        res.status(404);
        res.json(errorMessage);
    }
});

module.exports = router;
