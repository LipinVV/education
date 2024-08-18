const Book = require('../models/Book');
import { injectable } from 'inversify';
import { IBook, IBookRequestFields } from "../interfaces/index";

@injectable()
export class BooksRepository {
    async getBooks(): Promise<IBook[]> {
        return await Book.find();
    }

    async getBook(id: string): Promise<IBook | null> {
        return await Book.findOne({ id });
    }

    async createBook(params: IBookRequestFields): Promise<IBook> {
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


    async updateBook(id: string, params: IBookRequestFields): Promise<IBook> {
        const { title, description, authors, favourite } = params;
        const isFavourite = favourite !== undefined && params.toString() === 'on';
        const book = await Book.findOneAndUpdate(
            { id },
            { title: title, description: description, authors: authors, favourite: isFavourite },
            { new: true } // без этой опции по умолчанию метод возвращает документ до обновления
        );
        return book;
    }
}
