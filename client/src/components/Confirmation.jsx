import React from "react";
import "../styles/Confirmation.scss";

const Confirmation = ({
    book,
    handleDelete,
    showConfirmation,
    setShowConfirmation,
}) => {
    return (
        <div className="confirmation">
            <p>
                Are you sure you want to remove {book.title} from your
                inventory?
            </p>
            <div className="confirmation-buttons">
                <button className="remove-button" onClick={handleDelete}>Remove</button>
                <button className="cancel-button" onClick={() => setShowConfirmation(!showConfirmation)}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Confirmation;
