import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { deleteBook } from "../services/auth_services";
import { useNavigate } from "react-router-dom";
import { getCabFromStorage, removeCabFromStorage, setCabInStorage } from "../services/localStorageHandler";

const CabDetails = ({isCustomer,isAdmin,isDriver}) => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const [cab, setCab] = useState(() => {
        const temp = getCabFromStorage();
        return temp;
    })

    const handleToClose = () => {
        deleteBook(cab.reg_no);
        removeCabFromStorage();
        setOpen(false);
        navigate("/cabs");
    };

    const handleCancel = ()=>{
        setOpen(false);
    }

    const navFunc = () => {
        navigate("/cabsUpdate")
    }

    const handleRequest = ()=>{
        setCabInStorage(cab);
        navigate("/cabRequest")
    }

    const seeRequestsForCab = () => {
        navigate("/requestsForCab");
    }

    // customer Cab
    const seeBookStudentsForBook = () => {
        navigate("/bookStudentByBook");
    }

    return (
        <div>
            <p>{cab.reg_no}</p>
            <p>{cab.model}</p>
            <p>{cab.colour}</p>
            <p>{cab.fare}</p>

            {isCustomer &&
            <button onClick={handleRequest} className="btn btn-primary btn-block">
                Request Cab
            </button>    
            }  

            {isAdmin && 

            <>
            <button onClick={seeRequestsForCab} className="btn btn-primary btn-block">
                See all requests for this Cab
            </button>

            <button onClick={navFunc} className="btn btn-primary btn-block">
                Update Cab
            </button>

            <button onClick={()=>{setOpen(true)}} className="btn btn-primary btn-block">
                Delete Cab
            </button>

            </>
            } 

            {isAdmin && 
                <button onClick={seeBookStudentsForBook} className="btn btn-primary btn-block">
                    See all records for this Cab
                </button>
            } 
            
             
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Delete Cab"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the Cab?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleCancel} color="primary" autoFocus>
                        Cancel
                    </button>
                    <button onClick={handleToClose}
                        color="primary" autoFocus>
                        Delete
                    </button>
                    
                </DialogActions>
            </Dialog>
            
            
        </div>
    )
}

export default CabDetails;