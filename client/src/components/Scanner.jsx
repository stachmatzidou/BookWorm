import React, { useEffect } from "react";
import Quagga from "quagga";
import "./Scanner.css";
import Beep from "../assets/beep.mp3";

const Scanner = ({
    showBarcodeScanner,
    setShowBarcodeScanner,
    code,
    setCode,
}) => {
    useEffect(() => {
        Quagga.init(
            {
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    target: document.querySelector("#camera"), // The ID of the webcam element
                },
                decoder: {
                    readers: ["ean_reader"], // The type of barcode you want to scan
                },
            },
            (error) => {
                if (error) {
                    console.error(error);
                    return;
                }
                Quagga.start();
                Quagga.onDetected((data) => {
                    setCode(data.codeResult.code);
                    Quagga.stop();
                    // Use audio to signal when scanning is complete
                    const audio = new Audio(Beep);
                    audio.volume = 0.3;
                    audio.play();
                    setShowBarcodeScanner(!showBarcodeScanner);
                });
            }
        );
    }, []);

    return <div id="camera"></div>;
};

export default Scanner;
