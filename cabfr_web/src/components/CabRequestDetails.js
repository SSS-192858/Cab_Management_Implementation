import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { deleteRequest , accept } from "../services/request_services";
import { useNavigate } from "react-router-dom";
import { getRequestFromStorage } from "../services/localStorageHandler";
import dateFormat from "dateformat";
// this will be used to show the cab request details.
const CabRequestDetails = ({isCustomer,isAdmin,isDriver}) => {

    // open, open1 that will be used for working of dialog boxes.
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    // acceptOpen function that will be used to accept requests.
    const [acceptOpen, setAcceptOpen] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    
    // request that will be used to hold the selected request.
    const [request, setRequest] = useState(() => {
        const temp = getRequestFromStorage();
        return temp;
    })

    // this function will be called when we delete a request.
    const handleToClose = () => {
        deleteRequest(request.id);
        setOpen(false);
        setOpen1(false);
        if(isAdmin){navigate("/allRequests")}
        else if(isCustomer){navigate("/requestsForCustomer")}
        else if(isDriver){navigate("/requestForDriver")}

    };

    // this function will be called when we want to cancel the operation.
    const handleCancel = ()=>{
        setOpen(false);
    }

    // This function will be used when we want to cancel accepting the request.
    const handleCancelAccept = () => {
        setAcceptOpen(false);
    }

    // this functioin will be called when we want to accept the request.
    const handleAccept = async() => {
        accept(request).then(
            response => {
                setAcceptOpen(false);
                navigate("/allRequests")
            },
            error => {
              const resMessage = "The cab can't be assigned for the requested dates as it has already been issued to someone else for these dates."
              setMessage(resMessage);
              setAcceptOpen(false);
              setOpen1(true);
            }
        );
    }

    return (
        
        <div className="container">
            <div className="card">
                <div className="card-body">
                    
                <h1 className="card-title">
                {request.id}. {request.cab.reg_no} - {request.customer.customerName}
                </h1>
                <div className="card-text">
                    
                    <h4>
                        Cab Details :
                    </h4>
                    <p>Model : {request.cab.model}</p>
                    <p>Colour : {request.cab.colour}</p>
                    <p>Fare : {request.cab.fare}</p>

                    {request.cab.driver ?
                        <>
                            <h4>
                                Driver Details :
                            </h4>
                            <p></p>
                            <p>Driver Name : {request.cab.driver.driverName}</p>
                            <p>Email : {request.cab.driver.email}</p>
                            <p>Phone : {request.cab.driver.phone}</p>
                        </>
                    : null }
                    
                    <h4>
                        Customer Details :
                    </h4>
                    <p></p>
                    <p>Email : {request.customer.email}</p>
                    <p>Phone : {request.customer.phone}</p>

                    <p>
                        Start Date : {dateFormat(request.startDate,"fullDate")}
                    </p>
                    
                    <p>
                        End Date : {dateFormat(request.endDate,"fullDate")}
                    </p>

                    {(isAdmin || isDriver) &&
                    <button onClick={()=>{setAcceptOpen(true)}} className="btn btn-success" type="submit">
                        {/* option to accept the requests. */}
                        Accept
                    </button>
                    }
                    
                    <button onClick={()=>{setOpen(true)}} className="btn btn-danger" type="submit" >
                        {/* option to delete the request. */}
                        Delete
                    </button>
                </div>
                </div>
                </div>
            {message==="" ? (
                // Dialog box for accepting a cab request.
                <Dialog open={acceptOpen} onClose={handleAccept}>
                    <DialogTitle>{"Accept Request"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <button onClick={handleCancelAccept} color="primary" autoFocus>
                            {/* Option to cancel the accept request option. */}
                            Cancel
                        </button>
                        <button onClick={handleAccept}
                            color="success" autoFocus>
                                {/* option to accept the request. */}
                            Accept
                        </button>
                        
                    </DialogActions>
                </Dialog>):(
                    // Dialog box to delete the cab request.
                <Dialog open={open1} onClose={handleToClose}>
                    <DialogTitle>{"Delete Request"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <button onClick={handleToClose}
                        // delete request option.
                            color="danger" autoFocus>
                            Delete Request
                        </button>
                        
                    </DialogActions>
                </Dialog>
            ) 
            }    
            {/* Dialog box that will be used for deleting the request. */}
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Delete Request"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the request?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleCancel} color="primary" autoFocus>
                        {/* option to cancel the operation. */}
                        Cancel
                    </button>
                    <button onClick={handleToClose}
                        color="danger" autoFocus>
                        {/* option to delete the operation.*/}
                        Delete
                    </button>
                    
                </DialogActions>
            </Dialog>
            
        </div>
    )
}

export default CabRequestDetails;