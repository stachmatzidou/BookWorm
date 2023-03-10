import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/HeaderPopup.scss";

const HeaderPopup = ({showPopup, setShowPopup}) => {
    const navigate = useNavigate();
    const signout = async () => {
        try {
            await axios.get("/api/auth/signout");
            toast.success("Signed Out Successfully!");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Sign Out Failed!");
        }
    };
    return (
        <div className="header-popup">
            <ul>
                <li className="profile" onClick={() => setShowPopup(!showPopup)}>
                    <span className="material-symbols-rounded">person</span>
                    <Link className="account-link" to="/home/profile" >
                        My account
                    </Link>
                </li>
                <li className="sign-out" onClick={signout}>
                    <span className="material-symbols-rounded">logout</span>
                    <span className="sign-out-text">Sign Out</span>
                </li>
            </ul>
        </div>
    );
};

export default HeaderPopup;
