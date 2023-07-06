import React from "react";
import { Link } from "react-router-dom";
import { setCabInStorage } from "../services/localStorageHandler";

const CabListItem = ({cab}) => {

    const handleClick = () => {
        setCabInStorage(cab);
    }

    return (
        <a href="/cabDetails">
            <div className="card1" onClick={handleClick}>
                <div className="card-body">
                    <h1>Cab-Reg-Number - {cab.reg_no}</h1>
                    <br/>
                    <p>Cab Model - {cab.model}</p>
                    <p>Cab Colour - {cab.colour}</p>
                    <p>Cab Fare - {cab.fare}</p>
                </div>
            </div>
        </a>
    )
}
export default CabListItem;