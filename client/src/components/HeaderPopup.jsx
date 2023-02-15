import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./HeaderPopup.css";

const HeaderPopup = () => {
    const navigate = useNavigate();
    const signout = async () => {
        try {
            await axios.get("/api/auth/signout");
            toast.success("Signed Out Successfully!");
            navigate("/signin");
        } catch (error) {
            console.log(error);
            toast.error("Sign Out Failed!");
        };
    };
    return (
        <div className="header-popup">
            <ul>
                <li><Link className="account-link" to="/home/profile">Manage your account</Link></li>
                <li onClick={signout}>Sign Out</li>
            </ul>
        </div>
    );
};

export default HeaderPopup;
