import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { useNavigate } from "react-router-dom";
import { getPersonalDriverFromStorage, setDriverInStorage, removeDriverFromStorage} from "../services/localStorageHandler";
import { deleteDriver } from "../services/auth_services";
// used to see the personal driver(selected driver) details.
const PersonalDriverDetails = ({isDriver, isAdmin}) => {
    // open variable that will be used to working of dialog box.
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    // this will store the current driver.
    const [driver, setDriver] = useState(() => {
        const temp = getPersonalDriverFromStorage();
        setDriverInStorage(temp);
        return temp;
    })

    //  function to delete driver.
    const handleToClose = () => {
        deleteDriver(driver.id);
        setOpen(false);
        removeDriverFromStorage();
        navigate("/drivers")
    };

    // function to cancel the operation.
    const handleCancel = ()=>{
        setOpen(false);
    }

    // function to update driver.
    const navFunc1 = () => {
        navigate("/updateDriver");
    } 

    // function to request driver.
    const navFunc2 = () => {
        navigate("/requestForDriver");
    }

    // function to show cab bookings by driver.
    const navFunc3 = () => {
        navigate("/cabCustomerByDriver")
    }

    // functio to show cabs for the driver.
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
                    {(isDriver) && (
                        <>
                        <button onClick={navFunc1} className="btn btn-warning " type="submit">
                            {/* option to update the driver. */}
                            Update Info
                        </button>

                        <button onClick={navFunc2} className="btn btn-primary " type="submit">
                            {/* option to see requests. */}
                            See all Cab Requests
                        </button>

                        <button onClick={navFunc3} className="btn btn-primary " type="submit">
                            {/* option to see bookings */}
                            See all Cab Appointments
                        </button>

                        <button onClick={navFunc4} className="btn btn-primary " type="submit">
                            {/* option to see the cabs assigned to him */}
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
            {/* dialog box for deleting the driver. */}
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
                            {/* option to delete the operation. */}
                        Delete
                    </button>
                    
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default PersonalDriverDetails;