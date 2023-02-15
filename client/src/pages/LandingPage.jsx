import React, { useEffect } from "react";
import "./LandingPage.css";
import books from "../assets/books.png";
import useAuth from "../hooks/useAuth.jsx";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    //Check the Auth every time and auth and navigate are updated
    useEffect(() => {
        if (auth) {
            navigate("/home");
        }
    }, [auth, navigate]);

    return (
        <div className="landing-container">
            <div className="landing-container-left">
                <div className="landing-container-left-inner">
                    <h1 className="landing-headline">In Books We Trust!</h1>
                    <p>
                        BookWorm is a fun application that allows you to keep
                        track of your private library.
                    </p>
                    <p>
                        <Link className="signup-link" to="/signup">
                            Sign Up
                        </Link>{" "}
                        to start using it now!
                    </p>
                </div>
            </div>
            <div className="landing-container-right"></div>
            <footer className="landing-footer">
                <img src={books} alt="" />
            </footer>
        </div>
    );
};

export default LandingPage;
