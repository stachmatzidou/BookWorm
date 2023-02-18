import React, { useState } from "react";
import Quagga from "quagga";
import "./BarcodeScanner.css";
import Scanner from "./Scanner";

const BarcodeScanner = ({
    showBarcodeScanner,
    setShowBarcodeScanner,
    code,
    setCode,
}) => {
    return (
        <div className="barcode-scanner">
            <button onClick={() => setShowBarcodeScanner(!showBarcodeScanner)}>
                Go Back
            </button>
            <Scanner showBarcodeScanner={showBarcodeScanner} setShowBarcodeScanner={setShowBarcodeScanner} code={code} setCode={setCode} />
        </div>
    );
};

export default BarcodeScanner;
