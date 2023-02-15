import React, { useEffect } from "react";
import "./Auth.css";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";

const SignUp = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    //Check the Auth every time and auth and navigate are updated
    useEffect(() => {
        if (auth) {
            navigate("/home");
        }
    }, [auth, navigate]);
    
    const signUp = async (e) => {
        //prevent form default behavior
        e.preventDefault();
        //Get the values from all the inputs
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirm = e.target.confirm.value;
        //check if passwords match
        if (password !== confirm) {
            toast.error("Passwords do not match!");
            return;
        }
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
        <div className="signup">
            <div className="signup-form-aside"></div>
            <div className="signup-form-container">
                <div className="signup-form-container-inner">
                    <h1 className="signup-title">Create Account</h1>
                    <form action="" className="signup-form" onSubmit={signUp}>
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            required
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                        />

                        <label htmlFor="confirm">Confirm Password</label>
                        <input
                            id="confirm"
                            name="confirm"
                            type="password"
                            placeholder="Confirm Password"
                            required
                        />
                        <button className="signup-btn">Sign Up</button>
                    </form>
                    <p>
                        Already have an account?{" "}
                        <Link to="/signin">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
