import React from "react";
import { Link } from "react-router-dom";
import "../styles/Book.scss";

const Book = ({ book }) => {
    return (
        <article className="book">
            <img src={book.cover} alt="" />
            <div className="book-info">
                <h1 className="book-title capitalize">{book.title}</h1>
                <p>
                    <span>written by</span>{" "}
                    <span className="book-author capitalize">
                        <b>{book.author}</b>
                    </span>
                </p>
                <Link to={`/home/book/${book._id}`} book={book}>
                    More Info
                </Link>
            </div>
        </article>
    );
};

export default Book;
