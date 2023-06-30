import React, { useState } from "react";
import { registerCustomer } from "../services/auth_services";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useCustomerSignupFormValidator } from "../validators/signupCustomerValidator";

const SignupCustomer = () => {

    const [open, setOpen] = React.useState(false);

    const [form, setForm] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        customerName: "",
        email: "",
        phone: ""
    });

    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const {errors, validateForm} = useCustomerSignupFormValidator(form)

    const handleClickToOpen = () => {
        setOpen(true);
    };
 
    const handleToClose = () => {
        setOpen(false);
        navigate("/login")
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
        registerCustomer(form.username, form.password, form.customerName, form.email, form.phone).then(
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

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
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

                    <div className="form-group">
                    <label htmlFor="customerName">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="customerName"
                        aria-label="Customer Name"
                        value={form.customerName}
                        onChange={onUpdateField}
                    />

                    {errors.customerName.dirty && errors.customerName.error ? (
                            <div className="alert alert-danger" role="alert">{errors.customerName.message}</div>
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
                        <button className="btn btn-primary btn-block">Sign Up</button>
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
                        Customer was registered successfully, kindly click on the button to login again.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleToClose}
                        color="primary" autoFocus>
                        Go to Login Page
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SignupCustomer;