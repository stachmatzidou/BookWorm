import React from "react";
import {Link} from "react-router-dom";
import "./Error.css";

const Error = () => {
    return (
    <div className="error-container">
        <span style={{fontSize:"100px"}}>&#128533;</span>
        <h1>404</h1>
        <h1>Page Not Found</h1>
        <p><Link  className="error-link" to="/home">Visit Our Homepage</Link></p>
    </div>
    );
};

export default Error;
