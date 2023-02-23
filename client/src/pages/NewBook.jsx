import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "../styles/NewBook.scss";
import { toast } from "react-hot-toast";
import BarcodeScanner from "../components/BarcodeScanner.jsx";

const NewBook = ({ books, setBooks }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [pages, setPages] = useState("");
    const [description, setDescription] = useState("");
    const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
    const [code, setCode] = useState("");


    const getScannedData = async () => {
        if (code !== "") {
            const data = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=isbn:${code}&key=AIzaSyBcuidu8m83odBufiXPOO-3VE1x4Kpe7OA`
            ).then((response) => response.json());

            console.log(data);

            if (data.items) {
                const title = data.items[0].volumeInfo.title;
                const author = data.items[0].volumeInfo.authors;
                const category = data.items[0].volumeInfo.categories;
                const pages = data.items[0].volumeInfo.pageCount;
                const description = data.items[0].volumeInfo.description;

                title ? setTitle(title) : setTitle("");
                author ? setAuthor(author[0]) : setAuthor("");
                category ? setCategory(category[0]) : setCategory("");
                pages ? setPages(pages) : setPages("");
                description ? setDescription(description) : setDescription("");
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
    };

    const addBook = async (e) => {
        e.preventDefault();
        try {
            //create an object with those values
            const { data } = await axios.post("/api/books", {
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
                <button className="scanner-btn" onClick={runScanner}>
                    Scan ISBN Code
                </button>
                <form className="new-book-form" onSubmit={addBook}>
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
                </form>
                <button className="new-book-go-back" onClick={() => navigate("/home")}>Go Back</button>
            </div>
        </div>
    );
};

export default NewBook;
