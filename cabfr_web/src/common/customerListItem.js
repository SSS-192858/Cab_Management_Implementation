import React from "react";
import { Link } from "react-router-dom";
import { setCustomerInStorage} from "../services/localStorageHandler";

const CustomerListItem = ({customer}) => {

    const handleClick = () => {
        setCustomerInStorage(customer);
    }

    return (
    <Link to={"customerDetail"}>
        <div className="card1" onClick={handleClick}>
           <div className="card-body">
                <h3>Customer Name {customer.customerName}</h3>
                <p>Customer ID- {customer.id}</p>
                <p>Customer Email - {customer.email}</p>
                <p>Customer Phone - {customer.phone}</p>
            </div>
        </div>
    </Link>
    )
}

export default CustomerListItem;