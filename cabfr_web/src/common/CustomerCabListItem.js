import React from 'react'
import { Link } from "react-router-dom";
import dateFormat from 'dateformat';
import { setCustomerCabInStorage } from '../services/localStorageHandler';

//list item component to display cab customer assignment details
export const CustomerCabListItem = ({customerCab}) => {
  
    //when the component is clicked, the required cab customer record is set in storage
    const handleClick=()=>{
        setCustomerCabInStorage(customerCab);
    }

    //clickable link to display the details of the cab customer record when clicked
    return (
    <a href="/cabCustomerDetails">
    <div className="card1" onClick={handleClick}>
        <div className='card-body'>
            <h3>Cab- {customerCab.cab.reg_no}</h3>
            <h3>Customer- {customerCab.customer.customerName}</h3>
            <br/>
            <p>
                {/* Date format - Sunday, 9 July, 2023 */}
                From - {dateFormat(customerCab.startDate, "fullDate")}
            </p>
            <p>
                To - {dateFormat(customerCab.endDate, "fullDate")}
            </p>
            
        </div>
    </div>
    </a>
  )
}

export default CustomerCabListItem;