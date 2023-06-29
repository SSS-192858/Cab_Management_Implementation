import React from "react";
import { Link } from "react-router-dom";
import { setBookInStorage } from "../services/localStorageHandler";

const BookListItem = ({book}) => {

    const handleClick = () => {
        setBookInStorage(book);
    }

    return (
        <div className="book" onClick={handleClick}>
            <Link to="/moreInfo">
                <p>{book.bookCode}</p>
                <p>{book.bookTitle}</p>
                <p>{book.author}</p>
                <p>{book.bookDesc}</p>
            </Link>
        </div>
    )
}
export default BookListItem;