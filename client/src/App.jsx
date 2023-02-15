import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Layout from "./pages/Layout.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import NewBook from "./pages/NewBook.jsx";
import BookPage from "./pages/BookPage.jsx";
import About from "./pages/About.jsx";
import Profile from "./pages/Profile.jsx";
import Error from "./pages/Error.jsx";
import PrivateRoutes from "./pages/PrivateRoutes";

function App() {
    return (
        <>
            <Toaster
                position="top-center"
                toastOptions={{
                    style: { fontSize: "1.2rem" },
                }}
            ></Toaster>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                {/* <Route element={<PrivateRoutes />}> */}
                    <Route path="/home" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/home/book">
                            <Route index element={<NewBook />} />
                            <Route path=":id" element={<BookPage />} />
                        </Route>
                        <Route path="/home/about" element={<About />} />
                        <Route path="/home/profile" element={<Profile />} />
                    </Route>
                {/* </Route> */}
                <Route path="/*" element={<Error />} />
            </Routes>
        </>
    );
}

export default App;
