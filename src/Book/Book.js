// interface IBook = {
//     id: string,
//     title: string,
//     description: string,
//     authors: string,
//     favourite: string,
//     fileCover: string,
//     fileName: string,
//     fileBook: string,
// }
const { v4: uuid } = require('uuid');

 class Book {
    constructor(
        title = '',
        description = '',
        authors = '',
        favourite = '',
        fileCover = '',
        fileName = '',
        fileBook = '',
        id = uuid(),
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.authors = authors
        this.favourite = favourite
        this.fileCover = fileCover
        this.fileName = fileName
        this.fileBook = fileBook
    }
}

module.exports = Book;
