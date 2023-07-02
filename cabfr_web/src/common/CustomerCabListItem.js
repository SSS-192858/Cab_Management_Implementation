import React from 'react'
import { Link } from "react-router-dom";
import { setCustomerCabInStorage } from '../services/localStorageHandler';

export const CustomerCabListItem = ({customerCab}) => {
  
    const handleClick=()=>{
        setCustomerCabInStorage(customerCab);
    }

    return (
    <div className="book" onClick={handleClick}>
    <Link to="/cabCustomerDetails">
        <p>
            Cab Details :
        </p>
        <p>{customerCab.cab.reg_no}</p>
        <p>{customerCab.cab.model}</p>
        <p>{customerCab.cab.colour}</p>
        <p>{customerCab.cab.fare}</p>

        <p>
            Customer Details :
        </p>

        <p>{customerCab.customer.id}</p>
        <p>{customerCab.customer.customerName}</p>
        <p>{customerCab.customer.email}</p>
        <p>{customerCab.customer.phone}</p>

        <p>
            Start Date : {customerCab.startDate}
        </p>
        <p>
            End Date : {customerCab.endDate}
        </p>
    </Link>
    </div>
  )
}

export default CustomerCabListItem;