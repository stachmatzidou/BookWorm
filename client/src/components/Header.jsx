import React, {useState} from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import HeaderPopup from "./HeaderPopup.jsx";
import "./Header.css";

const Header = () => {
    const [showPopup, setShowPopup] = useState(false);
    const date = Date().split(" ").slice(0, 4).join().replaceAll(",", " ");
    const handleClick = () => {
        setShowPopup(!showPopup);
    };
    return (
        <header className="header">
            <div className="header-left">
                <span>{date}</span>
            </div>
            <div className="header-center">
                <img
                    src={logo}
                    alt=""
                    className="logo"
                    style={{ height: "40px" }}
                />
            </div>
            <div className="header-right" onClick={handleClick}>
                <h1 className="user">User</h1>
                {showPopup && <HeaderPopup />}
            </div>
        </header>
    );
};

export default Header;
