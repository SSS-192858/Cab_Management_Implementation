import React from "react";
import { Link } from "react-router-dom";
import { setDriverInStorage } from "../services/localStorageHandler";

const DriverListItem = ({driver}) => {

    const handleClick = () => {
        setDriverInStorage(driver);
    }

    return (
        <div className="book" onClick={handleClick}>
            <Link to="/driverDetail">
                <p>{driver.id}</p>
                <p>{driver.studentName}</p>
                <p>{driver.email}</p>
                <p>{driver.phone}</p>
            </Link>
        </div>
    )
}

export default DriverListItem;