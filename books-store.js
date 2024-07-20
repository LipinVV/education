const Book = require("./src/Book/Book");

const store = {
    books: [
        new Book(title='Книга №1', description='Интересная книга №1', authors='Знаменитый автор №1', farourite='', fileCover='', fileName='', fileBook='', id='1'),
        new Book(title='Книга №2', description='Интересная книга №2', authors='Знаменитый автор №2', farourite='', fileCover='', fileName='', fileBook='', id='2'),
    ],
};

module.exports = store;
