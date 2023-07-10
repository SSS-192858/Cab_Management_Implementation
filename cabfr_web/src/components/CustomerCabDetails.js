import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { deleteCustomerCabbyId } from "../services/user_services";
import { useNavigate } from "react-router-dom";
import { getCustomerCabFromStorage } from "../services/localStorageHandler";
import dateFormat from "dateformat";
// This will be used to show the customer cab booking info.
const CustomerCabDetail = ({isAdmin}) => {

    // this will be used to hold the selected customer cab booking.
    const [CustomerCab,setCustomerCab] = useState(() => {
        const temp = getCustomerCabFromStorage();
        return temp;
    })

    // open variable that will be used for working of dialog box.
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    // this function will be used when we want to delete the customer cab relation.
    const handleToClose = () => {
        deleteCustomerCabbyId(CustomerCab.slno);
        setOpen(false);
        navigate("/cabCustomerList");
    };

    // this function will be used when we want to cancel the operation.
    const handleCancel = ()=>{
        setOpen(false);
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                <h1 className="card-title">
                {CustomerCab.slno}. {CustomerCab.cab.reg_no} - {CustomerCab.customer.customerName}
                </h1>
                <div className="card-text">
                    
                    <h4>
                        Cab Details :
                    </h4>
                    <p>Model : {CustomerCab.cab.model}</p>
                    <p>Colour : {CustomerCab.cab.colour}</p>
                    <p>Fare : {CustomerCab.cab.fare}</p>

                    {CustomerCab.cab.driver ?
                        <>
                            <h4>
                                Driver Details :
                            </h4>
                            <p></p>
                            <p>Driver Name : {CustomerCab.cab.driver.driverName}</p>
                            <p>Email : {CustomerCab.cab.driver.email}</p>
                            <p>Phone : {CustomerCab.cab.driver.phone}</p>
                        </>
                    : null }
                    
                    <h4>
                        Customer Details :
                    </h4>
                    <p></p>
                    <p>Email : {CustomerCab.customer.email}</p>
                    <p>Phone : {CustomerCab.customer.phone}</p>

                    <p>
                        Start Date : {dateFormat(CustomerCab.startDate,"fullDate")}
                    </p>
                    
                    <p>
                        End Date : {dateFormat(CustomerCab.endDate,"fullDate")}
                    </p>
                </div>
                    
                {isAdmin && 
                <button onClick={()=>{setOpen(true)}} className="btn btn-danger" type="submit">
                    {/* This function will be used when we want to delete the customer cab relation. */}
                    Delete CustomerCab
                </button>
                }   
                </div>
            </div>
            {/* Dialog box that will be used when we want to delete the customer-cab booking. */}
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Delete CustomerCab"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this record?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleCancel} color="primary" autoFocus>
                        {/* option to cancel the operation */}
                        Cancel
                    </button>
                    <button onClick={handleToClose}
                        color="danger" autoFocus>
                            {/* Option to delete customer Cab */}
                        Delete CustomerCab
                    </button>
                </DialogActions>
            </Dialog>
            
    </div>
    )
}

export default CustomerCabDetail;