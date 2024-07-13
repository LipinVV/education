const express = require("express");
const router = express.Router();
const { books } = require('../../books-store');
const { urlRoutes, dictionary } = require("../../constants");
const { singleBookRoute } = urlRoutes;
const { errorMessage, positiveMessage } = dictionary;

router.delete(singleBookRoute, (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex(book => book.id === id);

    if(bookIndex !== -1){
        books.splice(bookIndex, 1);
        res.json(positiveMessage);
    } else {
        res.status(404);
        res.json(errorMessage);
    }
});

module.exports = router;
