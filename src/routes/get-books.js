const express = require('express');
const router = express.Router();
const { urlRoutes } = require('../../constants');
const { allBooksRoute } = urlRoutes;
const { books } = require('../../books-store');

router.get(allBooksRoute, (req, res) => {
    res.json(books);
});

module.exports = router;
