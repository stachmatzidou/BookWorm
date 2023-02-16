import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

const Layout = ({ user, setUser, books, setBooks }) => {
    const getUserInfo = async () => {
        try {
            const { data } = await axios.get("/api/users/current");
            setUser(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllBooks = async () => {
        try {
            const { data } = await axios.get("/api/books");
            setBooks(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserInfo();
        getAllBooks();
    }, []);
console.log(books);
    return (
        <div className="app">
            <Header user={user} />
            <Navbar />
            <main className="main">
                <Outlet />
            </main>
            <Footer books={books} />
        </div>
    );
};

export default Layout;
