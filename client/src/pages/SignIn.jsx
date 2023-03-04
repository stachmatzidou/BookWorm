import React, { useEffect } from "react";
import "../styles/Auth.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import { toast } from "react-hot-toast";
import usePasswordVisibilityToggle from "../hooks/usePasswordVisibilityToggle.jsx";

const SignIn = () => {
    const [inputType, icon] = usePasswordVisibilityToggle();

    const navigate = useNavigate();
    const { auth } = useAuth();
    //Check the Auth every time and auth and navigate are updated
    useEffect(() => {
        if (auth) {
            navigate("/home");
        }
    }, [auth, navigate]);

    const signIn = async (e) => {
        //prevent form default behavior
        e.preventDefault();
        //Get the email and password values
        const email = e.target.email.value;
        const password = e.target.password.value;
        //Sign in with those values
        try {
            await axios.post("api/auth/signin", {
                email,
                password,
            });
            //if the values are correct navigate to the user home page
            navigate("/home");
            toast.success("Signed In Successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Sign In Failed!");
        }
    };
    return (
        <div className="signin-container">
            <div className="signin-form-container">
                <h1 className="signin-title">Welcome Back</h1>
                <form className="signin-form" onSubmit={signIn}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <div className="input-container">
                        <input
                            id="password"
                            name="password"
                            type={inputType}
                            placeholder="Password"
                            required
                        />
                        <div className="svg-container">
                            {icon}
                        </div>
                    </div>
                    <button className="signin-btn">Sign In</button>
                </form>
                <p className="go-to-signup">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
