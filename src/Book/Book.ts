import { v4 as uuid } from 'uuid';
import { IBook } from "../interfaces/index";

export class Book implements IBook {
    id: string;
    title: string;
    description: string;
    authors: string;
    favourite: boolean;
    fileCover: string;
    fileName: string;
    fileBook: string;

    constructor(
        title = '',
        description = '',
        authors = '',
        favourite = false,
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
