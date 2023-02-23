import React from "react";
import { ClockLoader } from "react-spinners";
import "../styles/Spinner.scss";

const Spinner = () => {
    return (
        <div className="spinner-wrapper">
            < ClockLoader color="#476a31" />
        </div>
    );
};

export default Spinner;
