import React from "react";
import { setCabInStorage } from "../services/localStorageHandler";

//list item component to display cab details
const CabListItem = ({cab}) => {

    //when the component is clicked, the required cab is set in storage
    const handleClick = () => {
        setCabInStorage(cab);
    }

    //clickable link to display the details of the cab when clicked
    return (
        <a href="/cabDetails">
            <div className="card1" onClick={handleClick}>
                <div className="card-body">
                    <h3>Cab-Reg-No. - {cab.reg_no}</h3>
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