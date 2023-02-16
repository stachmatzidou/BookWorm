import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({
    search,
    setSearch,
    books,
    setBooks,
    searchResults,
    setSearchResults,
}) => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <form action="">
                    <label htmlFor="search"></label>
                    <input
                        className="search-books"
                        id="search"
                        type="text"
                        placeholder="Search Books"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
            </div>
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
