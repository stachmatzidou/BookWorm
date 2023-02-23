import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import HeaderPopup from "./HeaderPopup.jsx";
import "../styles/Header.scss";

const Header = ({ user }) => {
    const [showPopup, setShowPopup] = useState(false);
    const date = Date().split(" ").slice(0, 4).join().replaceAll(",", " ");
    const handleClick = () => {
        setShowPopup(!showPopup);
    };
    return (
        <header className="header">
            <div className="header-left">
                <span className="date">{date}</span>
            </div>
                <img className="logo" src={logo} alt="" />
            <div className="header-right">
                <button className="user" onClick={handleClick}>
                    {user?.username.split("")[0].toUpperCase()}
                </button>

                {showPopup && <HeaderPopup showPopup={showPopup} setShowPopup={setShowPopup}/>}
            </div>
        </header>
    );
};

export default Header;
