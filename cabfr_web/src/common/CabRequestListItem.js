import React from "react";
import { Link } from "react-router-dom";
import {setRequestInStorage} from "../services/localStorageHandler";

const CabRequestListItem = ({request}) => {

    const handleClick = () => {
        setRequestInStorage(request);
    }

    return (
        <div className="book" onClick={handleClick}>
            <Link to="/requestDetails">
                <p>
                    Cab Details :
                </p>
                <p>{request.cab.reg_no}</p>
                <p>{request.cab.model}</p>
                <p>{request.cab.colour}</p>
                <p>
                    Customer Details :
                </p>

                <p>{request.customer.id}</p>
                <p>{request.customer.customerName}</p>

                <p>
                    Start Date : {request.startDate}
                </p>
                <p>
                    End Date : {request.endDate}
                </p>
            </Link>
        </div>
    )
}

export default CabRequestListItem;