const express = require('express');
const axios = require('axios');
const router = express.Router();
const { errorMessage } = require('../constants').dictionary;
const Book = require('../models/Book');
import { container } from "../container";
import { Response } from 'express';
import { IExtendedRequest } from "../interfaces";
import { BooksRepository } from "../BooksRepository/BooksRepository";

const MAIN = '/';
const ID = '/:id';
const EDIT = '/edit';
const CREATE = '/create';
const BOOKS = '/books';
const COUNTER_API = process.env.COUNTER_API || 'http://counter:3003/counter';

// Get all books
router.get(MAIN, async (req: IExtendedRequest, res: Response) => {
    try {
        const repo = container.get(BooksRepository);
        const books = await repo.getBooks();
        res.render('books', { books: books, currentRoute: BOOKS, title: 'All Books', user: req.user });
    } catch (error: unknown) {
        res.status(500).json(errorMessage);
    }
});

// Render create book page
router.get(CREATE, (req: IExtendedRequest, res: Response) => {
    const book = {
        title: '',
        description: '',
        authors: '',
        favourite: false,
    };
    res.render('create', { currentRoute: CREATE, book: book, title: 'New book', user: req.user });
});

// Create a new book
router.post(CREATE, async (req: IExtendedRequest, res: Response) => {
    const { title, description, authors, favourite } = req.body;
    try {
        const repo = container.get(BooksRepository);
        await repo.createBook({ title, description, authors, favourite });

        res.redirect(BOOKS);
    } catch (error: unknown) {
        res.status(500).json(errorMessage);
    }
});

// Get book by id and increment counter
router.get(ID, async (req: IExtendedRequest, res: Response) => {
    const { id } = req.params;
    try {
        const repo = container.get(BooksRepository);
        const book = await repo.getBook(id);
        if (book) {
            try {
                const request = await axios.post(`${COUNTER_API}/${id}/incr`);
                const { data } = request;
                res.render('book', { book: book, currentRoute: '/book', viewData: data, title: book.title, user: req.user });
            } catch (error) {
                res.render('book', { book: book, currentRoute: '/book', viewData: 'N/A', title: 'Not found', user: req.user });
            }
        } else {
            res.status(404).json(errorMessage);
        }
    } catch (error: unknown) {
        res.status(500).json(errorMessage);
    }
});

// Render edit book page
router.get(ID + EDIT, async (req: IExtendedRequest, res: Response) => {
    const { id } = req.params;
    try {
        const repo = container.get(BooksRepository);
        const book = await repo.getBook(id);
        if (book) {
            res.render('update', { book: book, currentRoute: EDIT, title: book.title, user: req.user });
        } else {
            res.status(404).json(errorMessage);
        }
    } catch (error: unknown) {
        res.status(500).json(errorMessage);
    }
});

// Update a book by id
router.post(ID + EDIT, async (req: IExtendedRequest, res: Response) => {
    const { title, description, authors, favourite } = req.body;
    const { id } = req.params;

    try {
        const repo = container.get(BooksRepository);
        const book = await repo.updateBook(id, { title, description, authors, favourite });

        if (book) {
            res.redirect(`${BOOKS}/${id}`);
        } else {
            res.status(404).json(errorMessage);
        }
    } catch (error: unknown) {
        res.status(500).json(errorMessage);
    }
});

module.exports = router;
