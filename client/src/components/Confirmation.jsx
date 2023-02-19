import React from "react";
import "./Confirmation.css";

const Confirmation = ({ book, handleDelete, showConfirmation, setShowConfirmation }) => {
    return (
        <div className="confirmation">
            <h1>
                Are you sure you want to remove {book.title} from your inventory?
            </h1>
            <button onClick={handleDelete}>Remove</button>
            <button onClick={() => setShowConfirmation(!showConfirmation)}>Cancel</button>
        </div>
    );
};

export default Confirmation;
