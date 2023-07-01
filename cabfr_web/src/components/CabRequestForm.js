import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {registerRequest} from "../services/request_services";
import {getCabFromStorage, getCustomerFromStorage} from "../services/localStorageHandler";
import { RequestCabValidator } from "../validators/RequestCabValidator";

const CabRequestForm = () => {

    const [open, setOpen] = React.useState(false);

    const [form, setForm] = useState({
        startDate:"",
        endDate:""
    });

    const [cab, setCab] = useState(() => {
        const temp = getCabFromStorage();
        return temp;
    })

    const [customer, setCustomer] = useState(() => {
        const temp = getCustomerFromStorage();
        return temp;
    })

    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const {errors, validateForm} = RequestCabValidator(form);

    const handleClickToOpen = () => {
        setOpen(true);
    };
 
    const handleToClose = () => {
        setOpen(false);
        navigate("/cabs")
    };

    const onUpdateField = e => {
        const nextFormState = {
          ...form,
          [e.target.name]: e.target.value,
        };
        setForm(nextFormState);
    };

    const onSubmitForm = e => {
        setMessage("")
        e.preventDefault();    
        const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
        if (!isValid) return;
        registerRequest(customer,cab,form.startDate,form.endDate).then(
            response => {
                handleClickToOpen()
            },
            error => {
                const resMessage = (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                setMessage(resMessage)
            }
        )
    };

    return (

        <div className="col-md-12">
            <div className="card card-container">
            <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
            />

            <form onSubmit={onSubmitForm}>
                
                <div className="form-group">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                        type="date"
                        className="form-control"
                        name="startDate"
                        aria-label="startDate"
                        value={form.startDate}
                        onChange={onUpdateField}
                    />

                    {errors.startDate.dirty && errors.startDate.error ? (
                            <div className="alert alert-danger" role="alert">{errors.username.message}</div>
                            ) : null}
                    </div>

                    <div className="form-group">
                        <label htmlFor="endDate">End Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="endDate"
                            aria-label="endDate"
                            value={form.endDate}
                            onChange={onUpdateField}
                        />

                        {errors.endDate.dirty && errors.endDate.error ? (
                            <div className="alert alert-danger" role="alert">{errors.password.message}</div>
                            ) : null}
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Request Cab</button>
                    </div>

                    {message ? 
                        <div className="alert alert-danger" role="alert">{message}</div>
                        : null}
                </form>
            </div>

            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Request Cab"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        We have received your request kindly wait till it gets Approved. Bye Bye !
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleToClose}
                        color="primary" autoFocus>
                        Go to Cabs list
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CabRequestForm;