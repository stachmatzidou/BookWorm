import React from "react";
import "../styles/Footer.scss";

const Footer = ({ books }) => {
    const text = books.length === 1 ? "book" : "books";
    return (
        <footer className="footer">
            {books && (
                <p>
                    {books.length} {text} in Inventory
                </p>
            )}
        </footer>
    );
};

export default Footer;
