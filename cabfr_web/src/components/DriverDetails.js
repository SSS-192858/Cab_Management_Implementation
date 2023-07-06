import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { useNavigate } from "react-router-dom";
import { getDriverFromStorage,getPersonalDriverFromStorage,removeDriverFromStorage} from "../services/localStorageHandler";
import { deleteDriver } from "../services/auth_services";

const DriverDetails = ({isDriver, isAdmin}) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const [driver, setDriver] = useState(() => {
        const temp = getDriverFromStorage();
        return temp;
    })

    const [currDriver, setCurrentDriver] = useState(() => {
        const temp = getPersonalDriverFromStorage();
        return temp;
    })

    const handleToClose = () => {
        deleteDriver(driver.id);
        setOpen(false);
        removeDriverFromStorage();
        navigate("/drivers")
    };

    const handleCancel = ()=>{
        setOpen(false);
    }

    const navFunc1 = () => {
        navigate("/updateDriver");
    } 

    const navFunc2 = () => {
        navigate("/requestForDriver");
    }

    const navFunc3 = () => {
        navigate("/cabCustomerByDriver")
    }

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
                            Update Info
                        </button>

                        <button onClick={navFunc2} className="btn btn-primary " type="submit">
                            See all Cab Requests
                        </button>

                        <button onClick={navFunc3} className="btn btn-info " type="submit">
                            See all Cab Appointments
                        </button>

                        <button onClick={navFunc4} className="btn btn-primary " type="submit">
                            See all Cabs 
                        </button>

                        </>
                    )}

                    {isAdmin && (
                        <button onClick={()=>{setOpen(true)}} className="btn btn-danger " type="submit">
                            Delete Driver
                        </button>
                    )}
                </div>
            </div>
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Delete Dtiver"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {driver.driverName}?
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

export default DriverDetails;