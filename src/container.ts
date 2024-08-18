import 'reflect-metadata';
import { Container } from 'inversify';
import {BooksRepository} from "./BooksRepository/BooksRepository";

const container = new Container();

container.bind(BooksRepository).toSelf();

export { container };
