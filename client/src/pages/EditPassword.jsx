import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const EditPassword = () => {
    const navigate = useNavigate();

    const updatePassword = async (e) => {
        e.preventDefault();
        const password = e.target.password.value;
        const confirmPassword = e.target.confirm.value;
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match!");
        } else {
            try {
                const updatedUser = {
                    password: password
                };
                await axios.patch("/api/users/current", updatedUser);
                toast.success("Password Updated Successfully!");
                navigate("/home/profile");
            } catch (error) {
                console.log(error);
                toast.error("Server Error!");
            }
        }
    };

    return (
        <div>
            <form onSubmit={updatePassword}>
                <label htmlFor="password">New Password</label>
                <input id="password" name="password" type="password" required />
                <label htmlFor="confirm">Confirm New Password</label>
                <input id="confirm" name="confirm" type="password" required />
                <button>Update</button>
            </form>
            <Link to="/home/profile">Go Back</Link>
        </div>
    );
};

export default EditPassword;
