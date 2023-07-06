import React from "react";
import { Link } from "react-router-dom";
import { setDriverInStorage } from "../services/localStorageHandler";

const DriverListItem = ({driver}) => {

    const handleClick = () => {
        setDriverInStorage(driver);
    }

    return (
    <a href="/driverDetail">
        <div className="card1" onClick={handleClick}>
            <div className="card-body">
            <h3>Driver Name - {driver.driverName}</h3>
                <p>Driver Id - {driver.id}</p>
                <p>Driver Email - {driver.email}</p>
                <p>Driver Phone - {driver.phone}</p>
            </div>
        </div>
    </a>
    )
}

export default DriverListItem;