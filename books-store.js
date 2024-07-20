const Book = require("./src/Book/Book");

const store = {
    books: [
        new Book(title='Книга №1'),
        new Book(title='Книга №2'),
    ],
};

module.exports = store;
