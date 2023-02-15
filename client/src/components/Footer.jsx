import React from "react";
import "./Footer.css";

const Footer = ({books}) => {
    return (
        <footer className="footer">
            {books.length && <p>{books.length} books in Inventory</p>}
            {/* <p>{books?.length} books in Inventory</p> */}
        </footer>
    );
};

export default Footer;
