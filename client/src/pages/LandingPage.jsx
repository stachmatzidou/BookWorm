import React from "react";
import "./LandingPage.css";
import books from "../assets/books.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="landing-container">
            <div className="landing-container-left">
                <h1 className="landing-headline">In Books We Trust!</h1>
                <p>
                    BookWorm is a fun application that allows you to keep track
                    of your private library.
                </p>
                <p>
                    <Link className="signup-link" to="/signup">
                        Sign Up
                    </Link>{" "}
                    to start using it now!
                </p>
            </div>
            <div className="landing-container-right"></div>
            <footer className="landing-footer">
                <img src={books} alt="" />
            </footer>
        </div>
    );
};

export default LandingPage;
