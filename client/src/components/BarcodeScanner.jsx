import React, { useState } from "react";
import "../styles/BarcodeScanner.scss";
import Scanner from "./Scanner";

const BarcodeScanner = ({
    showBarcodeScanner,
    setShowBarcodeScanner,
    code,
    setCode,
}) => {
    return (
        <div className="barcode-scanner">
            <button
                className="go-back"
                onClick={() => setShowBarcodeScanner(!showBarcodeScanner)}
            >
                Go Back
            </button>
            <Scanner
                showBarcodeScanner={showBarcodeScanner}
                setShowBarcodeScanner={setShowBarcodeScanner}
                code={code}
                setCode={setCode}
            />
        </div>
    );
};

export default BarcodeScanner;
