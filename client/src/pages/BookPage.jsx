import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Confirmation from "../components/Confirmation.jsx";
import "../styles/BookPage.scss";

const BookPage = ({ books, setBooks }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        getOneBook();
    }, [books]);

    const getOneBook = async () => {
        try {
            const { data } = await axios.get(`/api/books/${id}`);
            setBook(data);
        } catch (error) {
            console.log(error);
            toast.error("Server Error!");
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/books/${id}`);
            const newList = books.filter((book) => book._id !== id);
            setBooks(newList);
            toast.success("Book Removed Successfully!");
            navigate("/home");
        } catch (error) {
            console.log(error);
            toast.error("Server Error!");
        }
    };

    return (
        <div className="book-page">
            {book && (
                <div className="book-page-container">
                    {showConfirmation && (
                        <Confirmation
                            book={book}
                            handleDelete={handleDelete}
                            showConfirmation={showConfirmation}
                            setShowConfirmation={setShowConfirmation}
                        />
                    )}
                    <div className="book-page-image-container">
                        <img src={book.cover} alt="" />
                    </div>
                    <div className="book-page-info">
                        <h1 className="book-page-title capitalize">
                            {book.title}
                        </h1>
                        <p className="author">
                            <span>written by</span>{" "}
                            <span className="capitalize">
                                <b>{book.author}</b>
                            </span>
                        </p>
                        <p className="book-page-category">Category: {book.category}</p>
                        <p className="book-page-pages">Pages: {book.pages}</p>
                    </div>
                    <div className="book-page-description">
                        <h1 className="description-title">Description</h1>
                        <p className="description-text">
                            {book.description}
                        </p>
                        <div className="book-page-buttons">
                            <button
                                className="book-page-update-button"
                                onClick={() => navigate(`../edit/${id}`)}

                            >
                                Update
                            </button>
                            <button
                                className="book-page-remove-button"
                                onClick={() =>
                                    setShowConfirmation(!showConfirmation)
                                }
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookPage;
