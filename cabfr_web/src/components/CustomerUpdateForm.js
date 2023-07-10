import React, { useState} from "react";
import { updateCustomer } from "../services/auth_services";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { getCustomerFromStorage, setCustomerInStorage } from "../services/localStorageHandler";
import { useCustomerUpdateFormValidator } from "../validators/CustomerUpdateValidator";
import image1 from "../assets/image1.png";

// form to update customer
const UpdateCustomer = () => {

    const [open, setOpen] = React.useState(false);
    // get customer from storage, the details of whom will be displayed here
    const [customer, setCustomer] = useState(() => {
        const temp = getCustomerFromStorage();
        return temp;
    })

    const [form, setForm] = useState({
        customerName: customer.customerName,
        email: customer.email,
        phone: customer.phone
    });

    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const {errors, validateForm} = useCustomerUpdateFormValidator(form)

    // open dialog box ( when details successfully updated )
    const handleClickToOpen = () => {
        const temp = {id: customer.id, customerName: form.customerName, email: form.email, phone: form.phone}
        setCustomerInStorage(temp)
        setOpen(true);
    };

    // close dialog box
    const handleToClose = () => {
        setOpen(false);
        navigate("/customerDetail")
    };

    // when any form field is updated, check validity of the field
    const onUpdateField = e => {
        const nextFormState = {
          ...form,
          [e.target.name]: e.target.value,
        };
        setForm(nextFormState);
    };

    // when update button is clicked, perform all validation checks
    // and if valid, display dialog box signifying completion and take user
    // to customer detail / profile page, else show errors 
    const onSubmitForm = e => {
        setMessage("")
        e.preventDefault();
        // check validity of form fields
        const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
        if (!isValid) return;
        updateCustomer(customer.id, form.customerName, form.email, form.phone).then(
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
                src={image1}
                alt="profile-img"
                className="profile-img-card"
            />

            {/* actual form */}
            <form onSubmit={onSubmitForm}>

                {/* customer name field */}
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

                    {/* email */}
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

                    {/* phone */}
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

                    {/* update button */}
                    <div className="form-group">
                        <button className="btn btn-block form-button">Update details</button>
                    </div>

                    {/* display error message ( if exists )*/}
                    {message ? 
                        <div className="alert alert-danger" role="alert">{message}</div>
                        : null}
                </form>
            </div>

            {/* Display dialog box when update has been successfully registered */}
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Update successful"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Customer details have been updated successfully!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* close and navigate back to customer details / profile page */}
                    <button onClick={handleToClose}
                        color="primary" autoFocus>
                        Close
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UpdateCustomer;