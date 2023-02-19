import React from "react";
import "./Footer.css";

const Footer = ({books}) => {
    return (
        <footer className="footer">
            {books && <p>{books?.length} {books?.length === 1 ? "book" : "books"} in Inventory</p>}
        </footer>
    );
};

export default Footer;
