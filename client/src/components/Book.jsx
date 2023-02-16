import React from "react";
import {Link} from "react-router-dom";

const Book = ({book}) => {
    return (
        <section>
            <h1>{book.title}</h1>
            <p>by {book.author}</p>
            <Link to={`/home/book/${book._id}`} book={book}>More Info</Link>
        </section>
    );
};

export default Book;
