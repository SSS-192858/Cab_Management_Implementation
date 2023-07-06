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
const CustomerCabDetail = ({isAdmin}) => {

    const [CustomerCab,setCustomerCab] = useState(() => {
        const temp = getCustomerCabFromStorage();
        return temp;
    })

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleToClose = () => {
        deleteCustomerCabbyId(CustomerCab.slno);
        setOpen(false);
        navigate("/cabCustomerList");
    };

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
                    Delete CustomerCab
                </button>
                }   
                </div>
            </div>
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Delete CustomerCab"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this record?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleCancel} color="primary" autoFocus>
                        Cancel
                    </button>
                    <button onClick={handleToClose}
                        color="danger" autoFocus>
                        Delete CustomerCab
                    </button>
                </DialogActions>
            </Dialog>
            
    </div>
    )
}

export default CustomerCabDetail;