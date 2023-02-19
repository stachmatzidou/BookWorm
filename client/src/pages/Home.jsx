import React, { useState } from "react";
import Book from "../components/Book.jsx";
import Spinner from "../components/Spinner.jsx";
import "./Home.css";

const Home = ({
    books,
    searchResults,
    setSearchResults,
    isLoading,
    // setIsLoading,
}) => {
    const elements = searchResults.map((book) => (
        <Book key={book._id} book={book} />
    ));
    return (
        <div className="home">
            {isLoading && <Spinner />}
            {!isLoading && (
                <div>
                    {elements.length ? elements : <p>No books to display.</p>}
                </div>
            )}
        </div>
    );
};

export default Home;
