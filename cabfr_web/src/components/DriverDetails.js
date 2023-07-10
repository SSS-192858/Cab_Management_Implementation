import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { useNavigate } from "react-router-dom";
import { getDriverFromStorage,getPersonalDriverFromStorage,removeDriverFromStorage} from "../services/localStorageHandler";
import { deleteDriver } from "../services/auth_services";

// option to show driver details.
const DriverDetails = ({isDriver, isAdmin}) => {
    // open variable that will be used to  
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    // driver varible that will be used to store other drivers.
    const [driver, setDriver] = useState(() => {
        const temp = getDriverFromStorage();
        return temp;
    })

    // This is will contain the current selected driver.
    const [currDriver, setCurrentDriver] = useState(() => {
        const temp = getPersonalDriverFromStorage();
        return temp;
    })

    // this function will be called when we delete the driver.
    const handleToClose = () => {
        deleteDriver(driver.id);
        setOpen(false);
        removeDriverFromStorage();
        navigate("/drivers")
    };

    // this function will be called when we want to cancel the operation.
    const handleCancel = ()=>{
        setOpen(false);
    }


//  this function will be called when we want to update driver.
    const navFunc1 = () => {
        navigate("/updateDriver");
    } 

    // this function will be called when we want to see the request for the driver.
    const navFunc2 = () => {
        navigate("/requestForDriver");
    }

    // this function will be called when we want to see the bookings for that driver.
    const navFunc3 = () => {
        navigate("/cabCustomerByDriver")
    }

    // this function will be called when we want to see the cabs for that driver.
    const navFunc4 = () => {
        navigate("/cabsForDriver")
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title">
                        Driver Name - {driver.driverName}
                    </h1>
                    <div className="card-text">
                        <p>Driver id - {driver.id}</p>
                        <p>Driver Email - {driver.email}</p>
                        <p>Driver Phone - {driver.phone}</p>
                    </div>
                    
                    {(isDriver && currDriver.id === driver.id) && (
                        <>
                        <button onClick={navFunc1} className="btn btn-warning " type="submit">
                            {/* option to update driver details. */}
                            Update Info
                        </button>

                        <button onClick={navFunc2} className="btn btn-primary " type="submit">
                            {/* option to see cab requests. */}
                            See all Cab Requests
                        </button>

                        <button onClick={navFunc3} className="btn btn-info " type="submit">
                            {/* option to see cab bookings. */}
                            See all Cab Appointments
                        </button>

                        <button onClick={navFunc4} className="btn btn-primary " type="submit">
                            {/* option to see all cabs */}
                            See all Cabs 
                        </button>

                        </>
                    )}

                    {isAdmin && (
                        <button onClick={()=>{setOpen(true)}} className="btn btn-danger " type="submit">
                            {/* option to delete the driver. */}
                            Delete Driver
                        </button>
                    )}
                </div>
            </div>
            {/* Dialog box to delete the driver */}
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Delete Dtiver"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {driver.driverName}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleCancel} color="primary" autoFocus>
                        {/* option to cancel the operation. */}
                        Cancel
                    </button>
                    <button onClick={handleToClose}
                        color="danger" autoFocus>
                            {/* option to delete the driver.*/}
                        Delete
                    </button>
                    
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DriverDetails;