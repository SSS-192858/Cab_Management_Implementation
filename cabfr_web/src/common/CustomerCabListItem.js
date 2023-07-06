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
            <p>
                Cab Details :
            </p>
            <p>Cab Registration Number {customerCab.cab.reg_no}</p>
            <p>Cab Model - {customerCab.cab.model}</p>
            <p>Cab Colour - {customerCab.cab.colour}</p>
            <p>Cab Fare - {customerCab.cab.fare}</p>

            <p>
                Customer Details :
            </p>

            <p>Customer Id - {customerCab.customer.id}</p>
            <p>Customer Name - {customerCab.customer.customerName}</p>
            <p>Customer Email - {customerCab.customer.email}</p>
            <p>Customer Phone - {customerCab.customer.phone}</p>

            <p>
                Start Date : dateFormat({customerCab.startDate},"fullDate");
            </p>
            <p>
                End Date : dateFormat({customerCab.endDate},"fullDate");
            </p>
        </div>
    </div>
    </a>
  )
}

export default CustomerCabListItem;