import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Profile.scss";

const Profile = ({ user, setUser }) => {
    return (
        <>
            {user && (
                <div className="profile-container">
                    <h1 className="profile-title">Welcome {user.username}</h1>
                    <p className="profile-text">What would you like to do?</p>
                    <Link className="profile-link" to="edit">Manage my account</Link>
                    <Link className="profile-link" to="password">Change Password</Link>
                </div>
            )}
        </>
    );
};

export default Profile;
