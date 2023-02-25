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
            {!isLoading && elements.length ? elements : <div className="no-books">No books to display</div>}
        </div>
    );
};

export default Home;
