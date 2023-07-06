import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";
import { getCustomerFromStorage,removeCustomerFromStorage} from "../services/localStorageHandler";
import { deleteCustomer} from "../services/auth_services";

const CustomerDetails = ({isCustomer, isAdmin}) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const [customer, setCustomer] = useState(() => {
        const temp = getCustomerFromStorage();
        return temp;
    })

    const handleToClose = () => {
        // deleteDriver(customer.id);
        deleteCustomer(customer.id);
        setOpen(false);
        // removeDriverFromStorage();
        removeCustomerFromStorage();
        navigate("/customers")
    };

    const handleCancel = ()=>{
        setOpen(false);
    }

    const navFunc1 = () => {
        navigate("/updateCustomer");
    } 

    const navFunc2 = () => {
        navigate("/requestForCustomer");
    }

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
                        Update Info
                        </button>
                    )}

                    <button onClick={navFunc2} className="btn btn-info " type="submit">
                        See all Cab Requests
                    </button>

                    <button onClick={navFunc3} className="btn btn-primary " type="submit">
                        See all Booked Cabs
                    </button>

                    {isAdmin && (
                        <button onClick={()=>{setOpen(true)}} className="btn btn-danger " type="submit">
                            Delete Customer
                        </button>
                    )}
                </div>
            </div>
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Delete Customer"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {customer.customerName}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleCancel} color="primary" autoFocus>
                        Cancel
                    </button>
                    <button onClick={handleToClose}
                        color="danger" autoFocus>
                        Delete
                    </button>
                    
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CustomerDetails;