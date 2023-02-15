import React from "react";
import { PacmanLoader } from "react-spinners";
import "./Spinner.css";

const Spinner = () => {
    return (
        <div className="spinner-wrapper">
            <PacmanLoader color="#0079bf" />
        </div>
    );
};

export default Spinner;
