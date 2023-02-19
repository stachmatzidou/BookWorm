import React from "react";
import { ClockLoader } from "react-spinners";
import "./Spinner.css";

const Spinner = () => {
    return (
        <div className="spinner-wrapper">
            < ClockLoader color="#476a31" />
        </div>
    );
};

export default Spinner;
