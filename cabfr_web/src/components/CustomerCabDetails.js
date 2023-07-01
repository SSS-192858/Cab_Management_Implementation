import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { deleteCustomerCabbyId } from "../services/user_services";
import { useNavigate } from "react-router-dom";
import { getCustomerCabFromStorage } from "../services/localStorageHandler";

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
        <div>
            <div className="book">
                <p>{CustomerCab.slno}</p>
                <p>
                    Cab Details
                </p>
                <p>{CustomerCab.cab.reg_no}</p>
                <p>{CustomerCab.cab.model}</p>
                <p>{CustomerCab.cab.colour}</p>
                <p>{CustomerCab.cab.fare}</p>

                <p>
                    Customer Details :
                </p>

                <p>{CustomerCab.customer.id}</p>
                <p>{CustomerCab.customer.customerName}</p>
                <p>{CustomerCab.customer.email}</p>
                <p>{CustomerCab.customer.phone}</p>

                <p>
                    Start Date : {CustomerCab.startDate}
                </p>
                <p>
                    End Date : {CustomerCab.endDate}
                </p>
                {CustomerCab.cab.driver && (
                    <>
                    <p> Driver Details</p>
                    <p>{CustomerCab.cab.driver.id}</p>
                    <p>{CustomerCab.cab.driver.driverName}</p>
                    <p>{CustomerCab.cab.driver.email}</p>
                    <p>{CustomerCab.cab.driver.phone}</p>
                    </>
                )}
            {isAdmin && 
            <button onClick={()=>{setOpen(true)}} className="btn btn-primary btn-block" type="submit">
                Delete CustomerCab
            </button>
            }   
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
                        color="primary" autoFocus>
                        Delete CustomerCab
                    </button>
                </DialogActions>
            </Dialog>
            </div>
    </div>
    )
}

export default CustomerCabDetail;