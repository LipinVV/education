import { IBook } from "../interfaces/index";

export abstract class BooksRepository {
    abstract createBook(book: IBook): Promise<IBook>;
    abstract getBook(id: string): Promise<IBook | null>;
    abstract getBooks(): Promise<IBook[]>;
    abstract updateBook(id: string, book: Partial<IBook>): Promise<IBook | null>;
    abstract deleteBook(id: string): Promise<void>;
}
