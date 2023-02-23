import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../styles/EditPassword.scss";

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
        <div className="update-password-container">
            <form className="update-password-form" onSubmit={updatePassword}>
                <label htmlFor="password">New Password</label>
                <input id="password" name="password" type="password" required />
                <label htmlFor="confirm">Confirm New Password</label>
                <input id="confirm" name="confirm" type="password" required />
                <div className="update-password-buttons">
                    <button type="button" className="update-password-go-back" onClick={() => navigate("/home/profile")}>Go Back</button>
                    <button className="update-password-update">Update</button>
                </div>
            </form>
        </div>
    );
};

export default EditPassword;
