import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.scss";
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
import EditProfile from "./pages/EditProfile";
import EditPassword from "./pages/EditPassword.jsx";
import EditBookPage from "./pages/EditBookPage.jsx";

function App() {
    const [user, setUser] = useState(null);
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <Toaster
                position="top-center"
                toastOptions={{
                    style: { fontSize: "1.8rem" },
                }}
            ></Toaster>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route element={<PrivateRoutes />}>
                    <Route
                        path="/home"
                        element={
                            <Layout
                                user={user}
                                setUser={setUser}
                                search={search}
                                setSearch={setSearch}
                                books={books}
                                setBooks={setBooks}
                                searchResults={searchResults}
                                setSearchResults={setSearchResults}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                            />
                        }
                    >
                        <Route
                            index
                            element={
                                <Home
                                    searchResults={searchResults}
                                    setSearchResults={setSearchResults}
                                    books={books}
                                    isLoading={isLoading}
                                />
                            }
                        />
                        <Route path="book">
                            <Route
                                index
                                element={
                                    <NewBook
                                        books={books}
                                        setBooks={setBooks}
                                    />
                                }
                            />
                            <Route
                                path=":id"
                                element={
                                    <BookPage
                                        books={books}
                                        setBooks={setBooks}
                                    />
                                }
                            />
                            <Route
                                path="edit/:id"
                                element={
                                    <EditBookPage
                                        books={books}
                                        setBooks={setBooks}
                                    />
                                }
                            />
                        </Route>
                        <Route path="about" element={<About />} />
                        <Route path="profile">
                            <Route
                                index
                                element={
                                    <Profile user={user} setUser={setUser} />
                                }
                            />
                            <Route
                                path="edit"
                                element={
                                    <EditProfile
                                        user={user}
                                        setUser={setUser}
                                    />
                                }
                            />
                            <Route path="password" element={<EditPassword />} />
                        </Route>
                    </Route>
                </Route>
                <Route path="*" element={<Error />} />
            </Routes>
        </>
    );
}

export default App;
