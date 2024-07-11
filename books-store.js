const Book = require("./src/Book/Book");

const store = {
    books: [
        new Book(title='Первая книга'),
        new Book(title='Вторая книга'),
    ],
};

module.exports = store;
