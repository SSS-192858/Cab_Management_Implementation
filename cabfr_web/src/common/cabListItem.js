import React from "react";
import { Link } from "react-router-dom";
import { setCabInStorage } from "../services/localStorageHandler";

const CabListItem = ({cab}) => {

    const handleClick = () => {
        setCabInStorage(cab);
    }

    return (
        <div className="book" onClick={handleClick}>
            <Link to="/cabDetails">
                <p>{cab.reg_no}</p>
                <p>{cab.model}</p>
                <p>{cab.colour}</p>
                <p>{cab.fare}</p>
            </Link>
        </div>
    )
}
export default CabListItem;