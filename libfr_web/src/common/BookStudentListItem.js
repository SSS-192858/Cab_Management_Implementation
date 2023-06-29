import React from 'react'
import { Link } from "react-router-dom";
import { setCabCustomerInStorage } from '../services/localStorageHandler';

export const CabCustomerListItem = ({cabCustomer}) => {
  
    const handleClick=()=>{
        setCabCustomerInStorage(cabCustomer);
    }

    return (
    <div className="book" onClick={handleClick}>
    <Link to="/cabCustomerDetail">
        <p>
            Cab Details :
        </p>
        <p>{cabCustomer.cab.reg_no}</p>
        <p>{cabCustomer.cab.model}</p>
        <p>{cabCustomer.cab.colour}</p>
        <p>{cabCustomer.cab.fare}</p>

        <p>
            Customer Details :
        </p>

        <p>{cabCustomer.customer.id}</p>
        <p>{cabCustomer.customer.customerName}</p>
        <p>{cabCustomer.customer.email}</p>
        <p>{cabCustomer.customer.phone}</p>

        <p>
            Start Date : {cabCustomer.startDate}
        </p>
        <p>
            End Date : {cabCustomer.endDate}
        </p>
    </Link>
    </div>
  )
}
