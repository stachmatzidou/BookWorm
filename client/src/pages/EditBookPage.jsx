import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import "../styles/EditBookPage.scss";

const EditBookPage = ({ books, setBooks }) => {
    const { id } = useParams();
    const book = books.find((book) => book._id === id);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [cover, setCover] = useState("");
    const [category, setCategory] = useState("");
    const [pages, setPages] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (book) {
            setTitle(book.title);
            setAuthor(book.author);
            setCover(book.cover);
            setCategory(book.category);
            setPages(book.pages);
            setDescription(book.description);
        }
    }, [book]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedBook = {
            cover: cover,
            title: title,
            author: author,
            category: category,
            pages: pages,
            description: description,
        };
        try {
            const { data } = await axios.put(`/api/books/${id}`, updatedBook);
            setBooks(
                books.map((book) => (book._id === id ? { ...data } : book))
            );
            toast.success("Book Updated Successfully!");
            navigate(`../${id}`);
        } catch (error) {
            console.log(error);
            toast.error("Server Error!");
        }
    };
    return (
        <div className="update-container">
            <form className="update-form" onSubmit={handleUpdate}>
                <button
                    type="button"
                    onClick={() => navigate(`../${id}`)}
                >
                    Go Back
                </button>
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

                <label htmlFor="author">Cover</label>
                <input
                    id="cover"
                    name="cover"
                    type="text"
                    placeholder="Cover"
                    required
                    value={cover}
                    onChange={(e) => setCover(e.target.value)}
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
                <label htmlFor="description">Description</label>
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
            </form>
        </div>
    );
};

export default EditBookPage;
