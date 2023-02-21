import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Confirmation from "../components/Confirmation.jsx";
import "./BookPage.css";

const BookPage = ({ books, setBooks }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [pages, setPages] = useState("");
    const [description, setDescription] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        getOneBook();
    }, [books]);

    useEffect(() => {
        setTitle(book.title);
        setAuthor(book.author);
        setCategory(book.category);
        setPages(book.pages);
        setDescription(book.description);
    }, [book]);

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

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedPost = {
            title: title,
            author: author,
            category: category,
            pages: pages,
            description: description,
        };
        try {
            const { data } = await axios.put(`/api/books/${id}`, updatedPost);
            setBooks(
                books.map((book) => (book._id === id ? { ...data } : book))
            );
            toast.success("Book Updated Successfully!");
            setShowPopup(!showPopup);
        } catch (error) {
            console.log(error);
            toast.error("Server Error!");
        }
    };

    return (
        <div className="book-page">
            {showConfirmation && (
                <Confirmation
                    book={book}
                    handleDelete={handleDelete}
                    showConfirmation={showConfirmation}
                    setShowConfirmation={setShowConfirmation}
                />
            )}
            {book && (
                <div className="book-page-container">
                    <h2 className="book-page-title capitalize">{book.title}</h2>
                    <p>
                        <span>by</span>{" "}
                        <span className="book-author capitalize">
                            {book.author}
                        </span>
                    </p>
                    <h2 className="book-page-category">{book.category}</h2>
                    <h2>{book.pages}</h2>
                    <h2>{book.description}</h2>
                    <h2>
                        {book.isRead
                            ? "You have already read this book."
                            : "You haven't read this book yet..."}
                    </h2>
                    <button onClick={() => setShowPopup(!showPopup)}>
                        Update
                    </button>
                    <button
                        onClick={() => setShowConfirmation(!showConfirmation)}
                    >
                        Delete
                    </button>
                </div>
            )}

            {showPopup && (
                <div className="update-container">
                    <form className="update-form" onSubmit={handleUpdate}>
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Title"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <label htmlFor="author">Author</label>
                        <input
                            id="author"
                            name="author"
                            type="text"
                            placeholder="Author"
                            required
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />

                        <label htmlFor="category">Category</label>
                        <input
                            id="category"
                            name="category"
                            type="text"
                            placeholder="Category"
                            required
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />

                        <label htmlFor="pages">Pages</label>
                        <input
                            id="pages"
                            name="pages"
                            type="text"
                            placeholder="Pages"
                            required
                            value={pages}
                            onChange={(e) => setPages(e.target.value)}
                        />
                        <textarea
                            name="description"
                            id="description"
                            placeholder="Description"
                            cols="30"
                            rows="5"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <button>Update</button>
                        <button onClick={() => setShowPopup(!showPopup)}>
                            Go Back
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default BookPage;
