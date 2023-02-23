import React from "react";
import "../styles/About.scss";
import Books from "../assets/books2.png";
import VintageBook from "../assets/book3.png";

const About = () => {
    return (
        <div className="about-container">
            <div className="about-image-container">
                <div className="title-container">
                    <h1>About BookWorm</h1>
                </div>
                <div className="image-container">
                    <img src={VintageBook} alt="" />
                </div>
            </div>
            <div className="about-text">
                <p>
                    BookWorm is a react application that allows you to keep
                    track of your book inventory in a fun and easy manner.
                </p>
                <p>
                    You can add your book information manually or by scanning
                    the book's ISBN code using your web camera.
                </p>
                <p>
                    You can also search through your inventory by book title or
                    book author, update and delete book information.
                </p>
                <p>
                    BookWorm is a react application that allows you to keep
                    track of your book inventory in a fun and easy manner.
                </p>
                <p>
                    You can add your book information manually or by scanning
                    the book's ISBN code using your web camera.
                </p>
                <p>
                    You can also search through your inventory by book title or
                    book author, update and delete book information.
                </p>
            </div>
        </div>
    );
};

export default About;
