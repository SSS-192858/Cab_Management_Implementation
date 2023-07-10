import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";
import { getCustomerFromStorage,removeCustomerFromStorage} from "../services/localStorageHandler";
import { deleteCustomer} from "../services/auth_services";

// Option to show customer Details.
const CustomerDetails = ({isCustomer, isAdmin}) => {
    // open variable that will be used to show the dialog boxes.
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    // customer variable that will hold the current selected customer.
    const [customer, setCustomer] = useState(() => {
        const temp = getCustomerFromStorage();
        return temp;
    })

    // this function will be called when we want to delete the customer.
    const handleToClose = () => {
        deleteCustomer(customer.id);
        setOpen(false);
        removeCustomerFromStorage();
        navigate("/customers")
    };

    // this function will be called when we want to cancel the operation.
    const handleCancel = ()=>{
        setOpen(false);
    }

    // this function will be called when we want to update the customer.
    const navFunc1 = () => {
        navigate("/updateCustomer");
    } 

    // this function will be called when we want to see the customer's requests.
    const navFunc2 = () => {
        navigate("/requestForCustomer");
    }

    // this function will be called when we want to see the customer's bookings.
    const navFunc3 = () => {
        navigate("/cabCustomerByCustomer")
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title">
                        Customer Name - {customer.customerName}
                    </h1>
                    <div className="card-text">
                        <p>Customer id - {customer.id}</p>
                        <p>Customer Email - {customer.email}</p>
                        <p>Customer Phone - {customer.phone}</p>
                    </div>
                    {isCustomer && (
                        <button onClick={navFunc1} className="btn btn-warning " type="submit">
                            {/* option to update customer detail. */}
                        Update Info
                        </button>
                    )}

                    <button onClick={navFunc2} className="btn btn-info " type="submit">
                        {/* option to see cab requests. */}
                        See all Cab Requests
                    </button>

                    <button onClick={navFunc3} className="btn btn-primary " type="submit">
                        {/* option to see all the bookings  */}
                        See all Booked Cabs
                    </button>

                    {isAdmin && (
                        <button onClick={()=>{setOpen(true)}} className="btn btn-danger " type="submit">
                            {/* Option to delete the customer. */}
                            Delete Customer
                        </button>
                    )}
                </div>
            </div>
            {/* Dialog box to delete customer details.*/}
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Delete Customer"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {customer.customerName}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleCancel} color="primary" autoFocus>
                        {/* Option to cancel the operation/*/}
                        Cancel
                    </button>
                    <button onClick={handleToClose}
                        color="danger" autoFocus>
                            {/* Option to delete the customer.*/}
                        Delete
                    </button>
                    
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CustomerDetails;