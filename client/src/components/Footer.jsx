import React from "react";
import "../styles/Footer.scss";

const Footer = ({ books, isLoading }) => {
    const text = books.length === 1 ? "book" : "books";
    if (isLoading) {
        return <footer className="footer"></footer>;
    };
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
