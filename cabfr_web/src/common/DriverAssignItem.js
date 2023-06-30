import React from "react";
import { Link } from "react-router-dom";
import { setDriverInStorage } from "../services/localStorageHandler";

const DriverAssignItem = ({driver, cab}) => {

    const navFunc = () => {
        setDriverInStorage(driver)
    }

    return (
        
        <div className="book" onClick={navFunc}>
            <Link to="/assignDriverConfirmation">
                <p>{driver.id}</p>
                <p>{driver.driverName}</p>
                <p>{driver.email}</p>
                <p>{driver.phone}</p>
            </Link>
        </div>
    )
}

export default DriverAssignItem;