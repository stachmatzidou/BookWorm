import React, { useState, useEffect, useRef } from "react";
import "../styles/Auth.scss";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import {
    faCheck,
    faTimes,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignUp = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    //Check the Auth every time auth and navigate are updated
    useEffect(() => {
        if (auth) {
            navigate("/home");
        }
    }, [auth, navigate]);

    const usernameRef = useRef();
    const [username, setUsername] = useState("");
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirm, setConfirm] = useState("");
    const [validConfirm, setValidConfirm] = useState(false);
    const [confirmFocus, setConfirmFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const user_Regex = /^[A-z][A-z0-9-_]{3,23}$/;
    const email_Regex = /^\w+([\.\-\_]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const password_Regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,23}$/;

    //useEffect to focus the username input on page render
    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    //useEffect to check if the username is valid, every time the username changes
    useEffect(() => {
        const result = user_Regex.test(username);
        setValidUsername(result);
    }, [username]);

    //useEffect to check whether the email is valid, every time the email changes
    useEffect(() => {
        const result = email_Regex.test(email);
        setValidEmail(result);
    }, [email]);

    //useEffect to check if password and confirm are valid, every time they change
    useEffect(() => {
        const result = password_Regex.test(password);
        setValidPassword(result);
        const match = password === confirm;
        setValidConfirm(match);
    }, [password, confirm]);

    // //useEffect for the error message
    // useEffect(() => {
    //     setErrorMessage("");
    // }, [username, email, password, confirm]);

    const signUp = async (e) => {
        //prevent form default behavior
        e.preventDefault();
        //check for errors
        if (!validUsername) return toast.error("Invalid Username!");
        if (!validEmail) return toast.error("Invalid Email!");
        if (!validPassword) return toast.error("Invalid Password");
        if (password !== confirm) return toast.error("Passwords do not match!");

        //store the necessary input values in an object
        const user = {
            username: username,
            email: email,
            password: password,
        };
        //create new user
        try {
            await axios.post("/api/auth/signup", user);
            toast.success("Sign up Successful!");
            //Clearing out the inputs
            e.target.username.value = "";
            e.target.email.value = "";
            e.target.password.value = "";
            e.target.confirm.value = "";
            //if its successful go to login
            navigate("/signin");
        } catch (error) {
            console.log(error);
            toast.error("Sign up Failed!");
        }
    };
    return (
        <div className="signup-container">
            <div className="signup-form-container">
                <h1 className="signup-title">Create Account</h1>
                <form className="signup-form" onSubmit={signUp}>
                    <label htmlFor="username">Username</label>
                    <div className="input-container">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            autoComplete="off"
                            value={username}
                            ref={usernameRef}
                            required
                            onChange={(e) => setUsername(e.target.value)}
                            onFocus={() => setUsernameFocus(true)}
                            onBlur={() => setUsernameFocus(false)}
                        />
                        <div className="svg-container">
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={validUsername ? "valid" : "hide"}
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validUsername || !username
                                        ? "hide"
                                        : "invalid"
                                }
                            />
                        </div>
                    </div>
                    <p
                        className={
                            usernameFocus && username && !validUsername
                                ? "instructions"
                                : "hide"
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} /> Between 4 and 24
                        characters.
                        <br />
                        Must begin with a letter.
                        <br />
                        Letters, numbers, underscores, hyphens are allowed.
                    </p>

                    <label htmlFor="email">Email</label>
                    <div className="input-container">
                        <input
                            id="email"
                            name="email"
                            type="text"
                            autoComplete="off"
                            placeholder="Email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <div className="svg-container">
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={validEmail ? "valid" : "hide"}
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validEmail || !email ? "hide" : "invalid"
                                }
                            />
                        </div>
                    </div>
                    <p
                        className={
                            emailFocus && email && !validEmail
                                ? "instructions"
                                : "hide"
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} /> Insert a valid
                        email address.
                    </p>

                    <label htmlFor="password">Password</label>
                    <div className="input-container">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            autoComplete="on"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <div className="svg-container">
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={validPassword ? "valid" : "hide"}
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validPassword || !password
                                        ? "hide"
                                        : "invalid"
                                }
                            />
                        </div>
                    </div>
                    <p
                        className={
                            passwordFocus && password && !validPassword
                                ? "instructions"
                                : "hide"
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24
                        characters.
                        <br />
                        Must include uppercase letter, one lowercase letter, a
                        number and a special character.
                    </p>

                    <label htmlFor="confirm">Confirm Password</label>
                    <div className="input-container">
                        <input
                            id="confirm"
                            name="confirm"
                            type="password"
                            autoComplete="on"
                            placeholder="Confirm Password"
                            value={confirm}
                            required
                            onChange={(e) => setConfirm(e.target.value)}
                            onFocus={() => setConfirmFocus(true)}
                            onBlur={() => setConfirmFocus(false)}
                        />
                        <div className="svg-container">
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={
                                    validConfirm && confirm ? "valid" : "hide"
                                }
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validConfirm || !confirm
                                        ? "hide"
                                        : "invalid"
                                }
                            />
                        </div>
                    </div>
                    <p
                        className={
                            confirmFocus && !validConfirm
                                ? "instructions"
                                : "hide"
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} /> Must match
                        password.
                    </p>
                    <button className="signup-btn">Sign Up</button>
                </form>
                <p className="go-to-signin">
                    Already have an account? <Link to="/signin">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
