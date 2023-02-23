import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Navbar.scss";

const Navbar = ({
    search,
    setSearch,
    books,
    setBooks,
    searchResults,
    setSearchResults,
}) => {
    useEffect(() => {
        const filteredResult = books.filter((book) => {
            return (
                book.title.toLowerCase().includes(search.toLowerCase()) ||
                book.author.toLowerCase().includes(search.toLowerCase())
            );
        });
        setSearchResults(filteredResult.reverse());
    }, [books, search]);

    return (
        <nav className="navbar">

{useParams()["*"] === "home" && (

            <div className="navbar-left">
                {/* {useParams()["*"] === "home" && ( */}
                    <form className="search-form">
                        <label htmlFor="search">Search</label>
                        <input
                            className="search-books"
                            id="search"
                            name="search"
                            type="text"
                            placeholder="Search By Title or Author"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                {/* )} */}
            </div>
                            )}





            <div className="navbar-right">
                <Link className="page-link" to="/home">
                    Home
                </Link>
                <Link className="page-link" to="/home/book">
                    Book
                </Link>
                <Link className="page-link" to="/home/about">
                    About
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
