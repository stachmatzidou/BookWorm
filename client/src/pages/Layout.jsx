import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

const Layout = ({
    user,
    setUser,
    search,
    setSearch,
    books,
    setBooks,
    searchResults,
    setSearchResults,
    isLoading,
    setIsLoading,
}) => {
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
            setIsLoading(true);
            const { data } = await axios.get("/api/books");
            setBooks(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserInfo();
        getAllBooks();
    }, []);

    return (
        <div className="app">
            <Header user={user} />
            <Navbar
                search={search}
                setSearch={setSearch}
                books={books}
                setBooks={setBooks}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
            />
            <main className="main">
                <Outlet />
            </main>
            <Footer books={books} isLoading={isLoading} />
        </div>
    );
};

export default Layout;
