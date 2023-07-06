import React from "react";
import { Link } from "react-router-dom";
import { setCustomerInStorage} from "../services/localStorageHandler";

const CustomerListItem = ({customer}) => {

    const handleClick = () => {
        setCustomerInStorage(customer);
    }

    return (
    <a href="customerDetail">
        <div className="card1" onClick={handleClick}>
           <div className="card-body">
                <h3>Customer Name {customer.customerName}</h3>
                <p>Customer ID- {customer.id}</p>
                <p>Customer Email - {customer.email}</p>
                <p>Customer Phone - {customer.phone}</p>
            </div>
        </div>
    </a>
    )
}

export default CustomerListItem;