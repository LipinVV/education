import { IBook } from "../interfaces/index";
const Book = require('../models/Book');
import { injectable } from 'inversify';

@injectable()
export class BooksRepository {
    async getBooks(): Promise<IBook[]> {
        return await Book.find();
    }

    async getBook(id: string): Promise<IBook | null> {
        return await Book.findOne({ id });
    }

    async createBook(params: any): Promise<IBook> {
        const bookCount = await Book.countDocuments(); // // для подсчета количества документов в коллекции, соответствующих определенным критериям

        const { title, description, authors, favourite } = params;

        const newBook = new Book({
            title,
            description,
            authors,
            favourite: favourite === 'on',
            id: (bookCount + 1).toString(),
        });

        return await newBook.save();   // нативный метод, который выполняет операцию записи в MongoDB
    }


    async updateBook(id: string, params: any): Promise<IBook> {
        const { title, description, authors, favourite } = params;
        const isFavourite = params.favourite !== undefined && params.favourite.toString() === 'on';
        const book = await Book.findOneAndUpdate(
            { id },
            { title: title, description: description, authors: authors, favourite: isFavourite },
            { new: true } // без этой опции по умолчанию метод возвращает документ до обновления
        );
        return book;
    }
}
