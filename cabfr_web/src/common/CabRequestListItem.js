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
                    <h1>
                        Cab Details :
                    </h1>
                    <p>Cab Reistration Number- {request.cab.reg_no}</p>
                    <p>Cab Model{request.cab.model}</p>
                    <p>Cab colour - {request.cab.colour}</p>
                    <p>
                        Customer Details :
                    </p>

                    <p>Customer Id - {request.customer.id}</p>
                    <p>Customer Name - {request.customer.customerName}</p>

                    <p>
                        Start Date : dateFormat({request.startDate},"fullDate");
                    </p>
                    <p>
                        End Date : dateFormat({request.endDate},"fullDate"):
                    </p>
                </div>
            </div>
        </a>
    )
}

export default CabRequestListItem;