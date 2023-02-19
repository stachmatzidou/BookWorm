import React from "react";

const About = () => {
    return (
        <div className="about-container">
            <h1>About</h1>
            <p>
                BookWorm is a react application that allows you to keep track of your book inventory in a fun and easy manner.
            </p>
            <p>
                You can add your book information manually or by scanning the book's ISBN code using your webcamera.
            </p>
            <p>
                You can also search through your inventory by book title or book author, update and delete book information.
            </p>
        </div>
    );
};

export default About;
