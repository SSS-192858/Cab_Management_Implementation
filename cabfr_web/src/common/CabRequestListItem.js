import React from "react";
import {setRequestInStorage} from "../services/localStorageHandler";
import dateFormat from 'dateformat';

//list item component to display cab customer request details
const CabRequestListItem = ({request}) => {

    //when the component is clicked, the required request is set in storage    
    const handleClick = () => {
        setRequestInStorage(request);
    }

    //clickable link to display the details of the request record when clicked    
    return (
        <a href="/requestDetails">
            <div className="card1" onClick={handleClick}>
                <div className="card-body">   
                    <h3>Cab- {request.cab.reg_no}</h3>
                    <h3>Customer- {request.customer.customerName}</h3>
                    <br/>
                    <p>
                        {/* Date format - Sunday, 9 July, 2023 */}
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