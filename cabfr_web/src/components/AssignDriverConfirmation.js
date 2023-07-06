import React, {useState} from "react";
import { useNavigate } from "react-router-dom/dist";
import { getCabFromStorage, getDriverFromStorage} from "../services/localStorageHandler";
import { assignDriverToCab } from "../services/user_services";

import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

const AssignDriverConfirmation = () => {

    const [cab, setCab] = useState(() => {
        const temp = getCabFromStorage();
        return temp;
    })

    const [open, setOpen] = useState(false);

    const [driver, setDriver] = useState(() => {
        const temp = getDriverFromStorage();
        return temp;
    })

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate("/assignDriver");
    }

    const handleAssign = () => {
        assignDriverToCab(cab.reg_no, driver);
        setOpen(true)
    }

    const handleToClose = () => {
        setOpen(false);
        navigate("/cabs")
    }

    return (

        <>
        <div className="container">
        <div className="card">
            <div className="card-body">
            <h1>Confirmation Page</h1>
            <h3>
                Cab Details - 
            </h3>
            <p>Cab Registration Number - {cab.reg_no}</p>
            <p>Cab Model - {cab.model}</p>
            <p>Colour - {cab.colour}</p>
            <p>Fare - {cab.fare}</p>

            <h3>
                Driver Details
            </h3>
            <p>Driver id - {driver.id}</p>
            <p>Driver Name - {driver.driverName}</p>
            <p>Driver email - {driver.email}</p>
            <p>Driver phone - {driver.phone}</p>
            
            <button className="btn btn-danger" onClick={handleCancel}>
                Cancel
            </button>

            <button className="btn btn-success" onClick={handleAssign}>
                Assign
            </button>

            </div>
            
            </div></div>

            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Assignment successful"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Driver was assigned successfully, kindly click on the button to close the dialog box.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleToClose}
                        color="primary" autoFocus>
                        Close
                    </button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AssignDriverConfirmation;