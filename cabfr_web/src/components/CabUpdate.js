import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";
import { getCabFromStorage,removeCabFromStorage } from "../services/localStorageHandler";
import { useCabSaveValidator } from "../validators/CabSaveValidator";
import { updateCab } from "../services/auth_services";
import image from "../assets/image.png";

//form to update the cab
const CabUpdateForm = () => {
  
    const [open,setOpen] = React.useState(false);

    //get cab from storage, to show on screen
    const [cab, setCab] = useState(() => {
      const temp = getCabFromStorage();
      return temp;
    })

    //form state variable
    const [form, setForm] = useState({
      reg_no: cab.reg_no,
      model: cab.model,
      colour:cab.colour,
      fare:cab.fare
  });

  const navigate = useNavigate();

  //functions ot handle the opening and closing of dialog box
  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
    navigate("/cabs")
    removeCabFromStorage();
  };

  const [message, setMessage] = useState("");

  const {errors, validateForm} = useCabSaveValidator(form);

  //form state update function
  const onUpdateField = e => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };

  //function called when we press submit
  const onSubmitForm = e => {
    setMessage("")
    e.preventDefault();  
    //if valid, send request to update  
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;
    updateCab(form.reg_no, form.model, form.colour, form.fare).then(
        response => {
          //open dialog box in case of success
            handleClickToOpen()
        },
        error => {
          //else show the error message
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

    <div className="col-md-12">``
        <div className="card card-container">
              <img
                src={image}
                alt="profile-img"
              />
              <br/>

            <form onSubmit={onSubmitForm}>
                <div className="form-group">
                    <p>
                        Cab Code : {cab.reg_no}
                    </p>
               </div>
              
              {/* Model input */}
                <div className="form-group">
                    <label htmlFor="model">Cab Model</label>
                    <input
                    className="form-control"
                    type="text"
                    aria-label="model"
                    name="model"
                    placeholder="Model"
                    value={form.model}
                    onChange={onUpdateField}
                    />

                    {errors.model.dirty && errors.model.error ? (
                            <div className="alert alert-danger" role="alert">{errors.model.message}</div>
                            ) : null}
                </div>

                {/* Colour input */}
                <div className="form-group">
                    <label htmlFor="colour">Car Colour</label>
                    <input
                    className="form-control"
                    type="colour"
                    aria-label="colour"
                    name="colour"
                    placeholder="Colour"
                    value={form.colour}
                    onChange={onUpdateField}
                    />

                    {errors.colour.dirty && errors.colour.error ? (
                            <div className="alert alert-danger" role="alert">{errors.colour.message}</div>
                            ) : null}
                </div>

                {/* Fare input */}
                <div className="form-group">
                    <label htmlFor="author">Fare</label>
                    <input
                    className="form-control"
                    type="fare"
                    aria-label="fare"
                    name="fare"
                    placeholder="Fare"
                    value={form.fare}
                    onChange={onUpdateField}
                    />

                    {errors.fare.dirty && errors.fare.error ? (
                            <div className="alert alert-danger" role="alert">{errors.fare.message}</div>
                            ) : null}
                </div>
                <div className="form-group">
                    <button className="btn btn-warning btn-block" type="submit">
                    Update Cab
                    </button>
                </div>

                {/* Conditonally show the error message */}
                {message ? 
                  <div className="alert alert-danger" role="alert">{message}</div>
                : null}
            </form>
        </div>

        {/* Dialog box to show the success of the request */}
        <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Cab Updated successfully"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Cab has been updated successfully;
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
  );
};

export default CabUpdateForm;