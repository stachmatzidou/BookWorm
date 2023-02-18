import React from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const BookPage = ({ books, setBooks }) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const book = books.find(book => (book._id).toString() === id);

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/books/${id}`);
            const newList = books.filter(book => book._id !== id);
            setBooks(newList);
            navigate("/home");
        } catch (error) {
            console.log(error);
            toast.error("Error!");
        };
    };

    const handleUpdate = async () => {

    };
    return (<div className="bookPage">
        {book && <>
            <h2>{book.title}</h2>
            <h2>{book.author}</h2>
            <h2>{book.category}</h2>
            <h2>{book.pages}</h2>
            <h2>{book.description}</h2>
            <h2>{book.isRead ? "You have already read this book." : "You haven't read this book yet..."}</h2>
            <button onClick={() => handleUpdate()}>Update</button>
            <button onClick={() => handleDelete()}>Delete</button>
        </>}
    </div>);
};

export default BookPage;
