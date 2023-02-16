import React from "react";
import Book from "../components/Book.jsx";

const Home = ({ books, setBooks }) => {
    const elements = books.map((book) => <Book key={book._id} book={book} />);
    return <div>{elements}</div>;
};

export default Home;
