import Book from "../models/Book.js";
import createError from "../utils/createError.js";

//Get all current user's books from the database
export const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find({ user: req.user.id });
        return res.status(200).json(books);
    } catch (error) {
        return next(error);
    };
};

//Get one book
export const getOneBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id).exec();
        // console.log(book);
        return res.status(200).json(book);
    } catch (error) {
        return next(error);
    };
};
//Create new book and save it in the database
export const createBook = async (req, res, next) => {
    try {
        const newBook = new Book({
            cover: req.body.cover,
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            description: req.body.description,
            pages: req.body.pages,
            user: req.user.id,
        });
        //save the new book
        const savedBook = await newBook.save();
        return res.status(201).json(savedBook);
    } catch (error) {
        return next(error);
    };
};
//Updating book
export const updateBook = async (req, res, next) => {
    try {
//Checking the existing book and user before updating book
        const book = await Book.findById(req.params.id).exec();
        if (!book) return next(createError({status: 404, message: "No book found."}));
        if (book.user.toString() !== req.user.id) return next(createError({status: 401, message: "This is not your book."}));
        //find book by id and update it
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
            cover: req.body.cover,
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            description: req.body.description,
            pages: req.body.pages,
            // isRead: req.body.isRead,
            user: req.user.id,
        }, {new: true});
        return res.status(200).json(updatedBook);
    } catch (error) {
        return next(error);
    };
};

//Deleting books
export const removeBook = async (req, res, next) => {
    try {
//Checking the existing book and user before deleting book
        const book = await Book.findById(req.params.id).exec();
        if (!book) return next(createError({status: 404, message: "No book found."}));
        if (book.user.toString() !== req.user.id) return next(createError({status: 401, message: "This is not your book."}));
        //find book by id and delete it
        await Book.findByIdAndDelete(req.params.id);
        return res.status(200).json("Book Deleted.");
    } catch (error) {
        next(error);
    };
};