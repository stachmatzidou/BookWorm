import React from "react";
import Book from "../components/Book.jsx";
import Spinner from "../components/Spinner.jsx";
import "../styles/Home.scss";

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

    if (isLoading)  {
    return <Spinner />;
    }

    return (
        <div className="home">
            {!isLoading && elements.length ? elements : <p className="no-books">No books to display</p>}
        </div>
    );
};

export default Home;
