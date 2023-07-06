import React from 'react'
import { Link } from "react-router-dom";
import dateFormat from 'dateformat';
import { setCustomerCabInStorage } from '../services/localStorageHandler';

export const CustomerCabListItem = ({customerCab}) => {
  
    const handleClick=()=>{
        setCustomerCabInStorage(customerCab);
    }

    return (
    <a href="/cabCustomerDetails">
    <div className="card1" onClick={handleClick}>
        <div className='card-body'>
            <h3>Cab- {customerCab.cab.reg_no}</h3>
            <h3>Customer- {customerCab.customer.customerName}</h3>
            <br/>
            <p>
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