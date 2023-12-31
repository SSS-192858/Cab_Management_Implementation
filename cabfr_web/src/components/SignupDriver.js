import React, { useState } from "react";
import { registerDriver } from "../services/auth_services";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useDriverSignupFormValidator } from "../validators/signupDriverValidator";
import image1 from "../assets/image1.png";

// driver signup form
// admin registers driver and then driver uses the credentials to login
const SignupDriver = () => {

    const [open, setOpen] = React.useState(false);

    const [form, setForm] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        driverName: "",
        email: "",
        phone: ""
    });

    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const {errors, validateForm} = useDriverSignupFormValidator(form)

    //opens dialog box
    const handleClickToOpen = () => {
        setOpen(true);
    };

    // closes dialog box
    const handleToClose = () => {
        setOpen(false);
        navigate("/admin")
    };

    // when any form field is updated, check validity of the field
    const onUpdateField = e => {
        const nextFormState = {
          ...form,
          [e.target.name]: e.target.value,
        };
        setForm(nextFormState);
    };

    // when register button is clicked, perform all validation checks ( including backend checks such as unique username )
    // and if valid, display dialog box signifying completion and take admin to home page and ask driver to login with the credentials
    // else display error message 

    const onSubmitForm = e => {
        setMessage("")
        e.preventDefault(); 
        // check validity of form fields   
        const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
        // if invalid
        if (!isValid) return;
        // if valid
        registerDriver(form.username, form.password, form.driverName, form.email, form.phone).then(
            //if successful, open dialog box
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

    // rendering form components on the screen

    return (

        <div className="col-md-12">
            <div className="card card-container">
            <img
                src={image1}
                alt="profile-img"
                className="profile-img-card"
            />

            {/* actual form */}
            <form onSubmit={onSubmitForm}>
                {/* username field */}
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        aria-label="Username"
                        value={form.username}
                        onChange={onUpdateField}
                    />

                    {errors.username.dirty && errors.username.error ? (
                            <div className="alert alert-danger" role="alert">{errors.username.message}</div>
                            ) : null}
                    </div>

                    {/* password field */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            aria-label="Password field"
                            value={form.password}
                            onChange={onUpdateField}
                        />

                        {errors.password.dirty && errors.password.error ? (
                            <div className="alert alert-danger" role="alert">{errors.password.message}</div>
                            ) : null}
                    </div>

                    {/* confirm password field */}
                    <div className="form-group">
                        <label htmlFor="password">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            aria-label="Confirm Password field"
                            value={form.confirmPassword}
                            onChange={onUpdateField}
                        />

                        {errors.confirmPassword.dirty && errors.confirmPassword.error ? (
                            <div className="alert alert-danger" role="alert">{errors.confirmPassword.message}</div>
                            ) : null}
                    </div>

                    {/* driver name field */}
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

                    {/* email field */}
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

                    {/* phone field */}
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

                    {/* register button */}
                    <div className="form-group">
                        <button className="btn btn-block form-button">Sign Up</button>
                    </div>

                    {/* display error message (if exists) */}
                    {message ? 
                        <div className="alert alert-danger" role="alert">{message}</div>
                        : null}
                </form>
            </div>

            {/* Display dialog box when driver has been successfully registered */}
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Signup successful"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Driver was registered successfully, kindly click on the button to close the dialog box.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* close dialog box, ask driver to use same credentials entered here to login as a driver */}
                    <button onClick={handleToClose}
                        color="primary" autoFocus>
                        Close
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SignupDriver;