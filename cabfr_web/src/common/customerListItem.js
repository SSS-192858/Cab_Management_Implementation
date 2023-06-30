import React from "react";
import { Link } from "react-router-dom";
import { setCustomerInStorage} from "../services/localStorageHandler";

const CustomerListItem = ({customer}) => {

    const handleClick = () => {
        setCustomerInStorage(customer);
    }

    return (
        <div className="book" onClick={handleClick}>
            <Link to="/customerDetail">
                <p>{customer.id}</p>
                <p>{customer.customerName}</p>
                <p>{customer.email}</p>
                <p>{customer.phone}</p>
            </Link>
        </div>
    )
}

export default CustomerListItem;