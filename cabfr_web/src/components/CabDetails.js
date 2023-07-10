import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { deleteCab } from "../services/auth_services";
import { useNavigate } from "react-router-dom";
import { getCabFromStorage, getPersonalDriverFromStorage, removeCabFromStorage, setCabInStorage, setDriverInStorage } from "../services/localStorageHandler";
import { removeDriverFromCab } from "../services/user_services";

// cab Details that will be used to show information regarding cabs.
const CabDetails = ({isCustomer,isAdmin,isDriver}) => {

    // open variable that will be used for working of dialog box.
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    // cab variable that will be used to hold the selected cab(retrived from local storage).
    const [cab, setCab] = useState(() => {
        const temp = getCabFromStorage();
        return temp;
    });

    // driver variable that will be used to hold the selected driver(retreived from local storage).
    const [driver, setDriver] = useState(() => {
        const temp = getPersonalDriverFromStorage();
        return temp;
    })

    // open1 variable that will be used for working of dialog box.
    const [open1, setOpen1] = useState(false);

    // handle to close function that will be used when we delete the cab.
    const handleToClose = () => {
        deleteCab(cab.reg_no);
        removeCabFromStorage();
        setOpen(false);
        navigate("/cabs");
    };

    // this function will be called when we cancel any operation.
    const handleCancel = ()=>{
        setOpen(false);
        setOpen1(false);
    }

    // this function will be called when we want to update cab.
    const navFunc = () => {
        navigate("/cabsUpdate")
    }

    // this function will be called when we want to request the cab.
    const handleRequest = ()=>{
        setCabInStorage(cab);
        navigate("/cabRequest")
    }

    //  this function will be called when we want to see requests for cab.
    const seeRequestsForCab = () => {
        navigate("/requestsForCab");
    }

    // getting customer cab booking info by cabs.
    const seeCustomerCabForCab = () => {
        navigate("/cabCustomerByCab");
    }

    // used for seeing driver assigned for cab.
    const seeDriverForCab = () => {
        setDriverInStorage(cab.driver)
        navigate("/driverDetail")
    }

    // used for assigning driver to the cabs.
    const AssignDriver = () => {
        setCabInStorage(cab);
        navigate("/assignDriver")
    }

    // this will be used for popping of first dialog box
    const openDialog = () => {
        setOpen1(true);
    }

    // This will be used for removing the driver assigned to the cab.
    const handleToClose1 = () => {
        removeDriverFromCab(cab.reg_no);
        setOpen1(false);
        navigate("/cabs")
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title">{cab.reg_no}</h1>
                    <div className="card-text">
                        <p>{cab.model}</p>
                        <p>{cab.colour}</p>
                        <p>{cab.fare}</p>

                        {(cab.driver) ? <>
                            <p>{cab.driver.id}</p>
                            <p>{cab.driver.driverName}</p>
                            <p>{cab.driver.email}</p>
                            <p>{cab.driver.phone}</p>
                            
                        </> : null}
                    </div>
                    {isCustomer &&
                    <button onClick={handleRequest} className="btn btn-success ">
                        {/* option for requesting a cab */}
                        Request Cab
                    </button>    
                    }  

                    {isAdmin && 

                    <>
                    <button onClick={seeRequestsForCab} className="btn btn-info ">
                        {/* option for seeing all request for the cab */}
                        See all requests for this Cab
                    </button>

                    <button onClick={navFunc} className="btn btn-warning ">
                        {/* option for updating the cab */}
                        Update Cab
                    </button>

                    <button onClick={()=>{setOpen(true)}} className="btn btn-danger ">
                        {/* option for deleting a cab. */}
                        Delete Cab
                    </button>

                    <button onClick={seeCustomerCabForCab} className="btn btn-primary ">
                        {/* option for seeing all bookings for the cab */}
                        See all records for this Cab
                    </button>
                    </>
                    } 
                

            {((isDriver) && (cab.driver) && (cab.driver.id === driver.id)) && 

            <>
            <button onClick={seeRequestsForCab} className="btn btn-info ">
                {/* option for seeing all request for this cab. */}
                See all requests for this Cab
            </button>

            <button onClick={seeCustomerCabForCab} className="btn btn-primary ">
                {/* option for seeing all bookings for the cab */}
                See all records for this Cab
            </button>
            </>
            } 

            {isAdmin ? 
            <button onClick={AssignDriver} className="btn btn-success ">
                {/* option to assing driver to the cab. */}
                Assign Driver
            </button>
            : null }

            {(cab.driver) ? <>
                <button onClick={seeDriverForCab} className="btn btn-primary ">
                    {/* option to see driver for this cab. */}
                    See driver of this cab
                </button>
                {isAdmin &&
                    <button onClick={openDialog} className="btn btn-danger">
                        {/* option to remove driver for this cab. */}
                        Remove Driver of this cab
                    </button>
                }
            </> : null}

            </div>
            </div>
             {/* Dialog box to delete the cab. */}
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Delete Cab"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the Cab?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleCancel} color="primary" autoFocus>
                        {/* option to cancel the operation. */}
                        Cancel
                    </button>
                    <button onClick={handleToClose}
                        color="danger" autoFocus>
                            {/* option to delete the cab. */}
                        Delete
                    </button>
                    
                </DialogActions>
            </Dialog>

            {/*Dialog box for removing driver for the cab.  */}
            <Dialog open={open1} onClose={handleToClose1}>
                <DialogTitle>{"Remove Driver for Cab"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to remove the driver for this cab?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* option to cancel the operation. */}
                    <button onClick={handleCancel} color="primary" autoFocus>
                        Cancel
                    </button>
                    <button onClick={handleToClose1}
                    // option to remove the driver from the cab.
                        color="danger" autoFocus>
                        Remove
                    </button>
                    
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CabDetails;