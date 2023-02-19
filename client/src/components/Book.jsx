import React from "react";
import { Link } from "react-router-dom";
import "./Book.css";

const Book = ({ book }) => {

    return (
        <article className="book">
            <h1 className="book-title capitalize">{book.title}</h1>
            <p><span >by</span> <span className="book-author capitalize">{book.author}</span></p>
            <Link to={`/home/book/${book._id}`} book={book}>
                More Info
            </Link>
        </article>
    );
};

export default Book;
