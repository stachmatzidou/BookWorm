import React from "react";
import Book from "../components/Book.jsx";

const Home = ({ searchResults }) => {
    const elements = searchResults.map((book) => <Book key={book._id} book={book} />);
    return (
        <div>{elements.length ? elements : <p>No books to display.</p>}</div>
    );
};

export default Home;
