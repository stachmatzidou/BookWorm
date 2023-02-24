import React from "react";
import "../styles/About.scss";
import book from "../assets/book.png";
import trust from "../assets/in-books-we-trust2.png";

const About = () => {
    return (
        <div className="about-container">
            <div className="about-image-container">
                <div className="title-container">
                    <h1>About BookWorm</h1>
                </div>
                <div className="image-container">
                    <img src={book} alt="" />
                </div>
            </div>
            <div className="about-text-container">
                <div className="mission">
                    Our mission is to <span className="help">help</span> you{" "}
                    <span className="organize">organize</span> your{" "}
                    <span className="books">books</span> while having{" "}
                    <span className="fun">fun</span>.
                </div>
                <div className="about-rest-container">
                    <img className="trust" src={trust} alt="" />
                    <div className="about-text">
                        <div className="about-about">
                            <h1 className="about-text-title">About</h1>
                            <p>
                                BookWorm is an easy to use, fun application,
                                designed by a book lover ( aka a bookworm ). It
                                allows you to keep track of your book inventory
                                in a fun and simple manner.
                            </p>
                        </div>
                        <div className="about-how-to">
                            <h1 className="about-text-title">How to</h1>
                            <p>
                                You can choose to add your book information
                                either manually or by scanning the book's unique
                                ISBN code using your web camera. The application
                                uses the Google Books API to automatically get
                                the book information for you.
                            </p>
                            <p>
                                You can also search through your complete
                                inventory by book title or book author, update
                                and of course delete book information.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
