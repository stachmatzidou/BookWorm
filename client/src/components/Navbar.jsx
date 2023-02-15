import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <input
                    className="search-books"
                    type="text"
                    placeholder="Search Books"
                />
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
