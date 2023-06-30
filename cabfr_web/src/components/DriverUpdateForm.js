import React, { useState} from "react";
// import { updateStudent } from "../services/auth_services";
import { updateDriver } from "../services/auth_services";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useDriverUpdateFormValidator} from "../validators/DriverUpdateValidator";
import { getDriverFromStorage, setDriverInStorage} from "../services/localStorageHandler";

const UpdateDriver = () => {

    const [open, setOpen] = React.useState(false);
    const [driver, setDriver] = useState(() => {
        const temp = getDriverFromStorage
        return temp;
    })

    const [form, setForm] = useState({
        driverName: driver.driverName,
        email: driver.email,
        phone: driver.phone
    });

    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const {errors, validateForm} = useDriverUpdateFormValidator(form)

    const handleClickToOpen = () => {
        const temp = {id: driver.id, driverName: form.driverName, email: form.email, phone: form.phone}
        // setStudentInStorage(temp);
        setDriverInStorage(temp);
        setOpen(true);
    };
 
    const handleToClose = () => {
        setOpen(false);
        navigate("/driverDetail")
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
        updateDriver(driver.id, form.driverName, form.email, form.phone).then(
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
                    <label htmlFor="driverName">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="driverName"
                        aria-label="Driver Name"
                        value={form.driverName}
                        onChange={onUpdateField}
                    />

                    {errors.driverName.dirty && errors.driverName.error ? (
                            <div className="alert alert-danger" role="alert">{errors.driverName.message}</div>
                            ) : null}
                    </div>

                    <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        name="email"
                        aria-label="Email"
                        value={form.email}
                        onChange={onUpdateField}
                    />

                    {errors.email.dirty && errors.email.error ? (
                            <div className="alert alert-danger" role="alert">{errors.email.message}</div>
                            ) : null}
                    </div>

                    <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        aria-label="Phone"
                        value={form.phone}
                        onChange={onUpdateField}
                    />

                    {errors.phone.dirty && errors.phone.error ? (
                            <div className="alert alert-danger" role="alert">{errors.phone.message}</div>
                            ) : null}
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Update details</button>
                    </div>

                    {message ? 
                        <div className="alert alert-danger" role="alert">{message}</div>
                        : null}
                </form>
            </div>

            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Signup successful"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Driver details have been updated successfully!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleToClose}
                        color="primary" autoFocus>
                        Close
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UpdateDriver;