import React from "react";
import { setDriverInStorage } from "../services/localStorageHandler";
import {Link} from 'react-router-dom';

//list item component to display driver details
const DriverListItem = ({driver}) => {

    //set the driver in storage when clicked
    const handleClick = () => {
        setDriverInStorage(driver);
    }

    //clickable link to go to the driver details page when clicked
    return (
    <Link to={"/driverDetail"}>
        <div className="card1" onClick={handleClick}>
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

export default DriverListItem;