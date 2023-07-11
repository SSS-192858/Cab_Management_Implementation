import React from "react";
import { Link } from "react-router-dom";
import { setDriverInStorage } from "../services/localStorageHandler";

//component to display driver details, when a particular driver is to be chosen to assign to a cab
const DriverAssignItem = ({driver, cab}) => {

    //set the driver in storage when clicked
    const navFunc = () => {
        setDriverInStorage(driver)
    }

    //clickable link to go to the assign confirmation page when clicked 
    return (
    <Link to={"/assignDriverConfirmation"}>
        <div className="card1" onClick={navFunc}>
            <div className="card-body">
                <h3>Driver Name - {driver.driverName}</h3>
                <p>Driver Id - {driver.id}</p>
                <p>Driver Email - {driver.email}</p>
                <p>Driver Phone - {driver.phone}</p>
            </div>
        </div>
    </Link>
    )
}

export default DriverAssignItem;