// interface IBook = {
//     id: string,
//     title: string,
//     description: string,
//     authors: string,
//     favorite: string,
//     fileCover: string,
//     fileName: string
// }
const { v4: uuid } = require('uuid');
 class Book {
    constructor(
        title = '',
        description = '',
        authors = '',
        favorite = '',
        fileCover = '',
        fileName = '',
        id = '1',
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
    }
}

module.exports = Book;