import React from "react";
import { Link } from "react-router-dom";
import {setRequestInStorage} from "../services/localStorageHandler";
import dateFormat from 'dateformat';
const CabRequestListItem = ({request}) => {

    const handleClick = () => {
        setRequestInStorage(request);
    }

    return (
        <a href="/requestDetails">
            <div className="card1" onClick={handleClick}>
                <div className="card-body">   
                    <h3>Cab- {request.cab.reg_no}</h3>
                    <h3>Customer- {request.customer.customerName}</h3>
                    <br/>
                    <p>
                        From - {dateFormat(request.startDate, "fullDate")}
                    </p>
                    <p>
                        To - {dateFormat(request.endDate, "fullDate")}
                    </p> 
                    
                </div>
            </div>
        </a>
    )
}

export default CabRequestListItem;