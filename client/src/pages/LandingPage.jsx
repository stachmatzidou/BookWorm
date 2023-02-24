import React, { useEffect } from "react";
import "../styles/LandingPage.scss";
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
                    <h1 className="landing-headline">In Books We Trust!</h1>
                    <p className="landing-text">
                        BookWorm is an easy to use, fun application that allows
                        you to keep track of your private library.
                    </p>
                    <p className="landing-text">
                        You can either add books manually or you can
                        use your web camera to scan each book's ISBN code to get the
                        information automatically from Google Books API!
                    </p>

                    <p className="landing-text">
                        <Link className="signup-link" to="/signin">
                            Sign In
                        </Link>{" "}
                        to start using it now!
                    </p>
            </div>
            <div className="landing-container-right">
                <img src={books} alt="" />
            </div>
        </div>
    );
};

export default LandingPage;
