import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import noImage from "../assets/no-image.jpg";
import "../styles/NewBook.scss";
import { toast } from "react-hot-toast";
import BarcodeScanner from "../components/BarcodeScanner.jsx";

const NewBook = ({ books, setBooks }) => {
    const navigate = useNavigate();
    const [cover, setCover] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [pages, setPages] = useState("");
    const [description, setDescription] = useState("");
    const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
    const [code, setCode] = useState("");

    const getScannedData = async () => {
        const key = import.meta.env.VITE_API_KEY;

        if (code !== "") {
            const data = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=isbn:${code}&key=${key}`
            ).then((response) => response.json());

            if (data.items) {
                const bookInfo = data.items[0].volumeInfo;
                const cover = bookInfo.imageLinks?.thumbnail;
                const title = bookInfo.title;
                const author = bookInfo.authors;
                const category = bookInfo.categories;
                const pages = bookInfo.pageCount;
                const description = bookInfo.description;

                cover ? setCover(cover) : setCover(noImage);
                title ? setTitle(title) : setTitle("Book Title Not Available");
                author ? setAuthor(author[0]) : setAuthor("Unavailable");
                category ? setCategory(category[0]) : setCategory("Book Category Not Available");
                pages ? setPages(pages) : setPages("Number of Book Pages Not Available");
                description ? setDescription(description) : setDescription("Book Description Not Available");
            } else {
                toast.error("Book not Found!");
            }
            setCode("");
        }
    };

    useEffect(() => {
        getScannedData();
    }, [code]);

    const runScanner = () => {
        setShowBarcodeScanner(!showBarcodeScanner);
        setTitle("");
        setAuthor("");
        setCover("");
        setCategory("");
        setPages("");
        setDescription("");
    };

    const addBook = async (e) => {
        e.preventDefault();
        try {
            //create an object with those values
            const { data } = await axios.post("/api/books", {
                cover: cover,
                title: title,
                author: author,
                category: category,
                pages: pages,
                description: description,
            });
            const newList = [...books, data];
            setBooks(newList);

            setTitle("");
            setAuthor("");
            setCover("");
            setCategory("");
            setPages("");
            setDescription("");

            toast.success("Book Added Successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Book was not added!");
        }
    };

    return (
        <div className="new-book">
            {showBarcodeScanner && (
                <BarcodeScanner
                    showBarcodeScanner={showBarcodeScanner}
                    setShowBarcodeScanner={setShowBarcodeScanner}
                    code={code}
                    setCode={setCode}
                />
            )}
            <div className="new-book-container">
                <form className="new-book-form" onSubmit={addBook}>
                    <button
                        className="scanner-btn"
                        type="button"
                        onClick={runScanner}
                    >
                        Scan ISBN Code
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

                    <label htmlFor="author">Cover Url</label>
                    <input
                        id="cover"
                        name="cover"
                        type="text"
                        placeholder="Cover Url"
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
                    <button>Add Book</button>
                    <button
                        className="new-book-go-back"
                        type="button"
                        onClick={() => navigate("/home")}
                    >
                        Go Back
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewBook;
