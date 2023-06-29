import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";
import {useBookSaveValidator} from "../validators/BookSaveValidator";
import {saveBook} from '../services/auth_services';
import { removeBookFromStorage } from "../services/localStorageHandler";

const BookSaveForm = () => {
  
    const [open,setOpen] = React.useState(false);

    const [form, setForm] = useState({
        bookTitle: "",
        author: "",
        bookDesc:""
  });

  const navigate = useNavigate();

  const handleClickToOpen = () => {
    setOpen(true);
};
  const [message, setMessage] = useState("");

  const {errors, validateForm} = useBookSaveValidator(form)

  const onUpdateField = e => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };

  const handleToClose = () => {
    setOpen(false);
    navigate("/books")
    removeBookFromStorage();
  };

  const onSubmitForm = e => {
    setMessage("")
    e.preventDefault();    
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;
    saveBook(form.bookTitle, form.bookDesc, form.author).then(
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
                    <label htmlFor="bookTitle">Book Title</label>
                    <input
                    className="form-control"
                    type="text"
                    aria-label="bookTitle"
                    name="bookTitle"
                    placeholder="book name"
                    value={form.bookTitle}
                    onChange={onUpdateField}
                    />

                    {errors.bookTitle.dirty && errors.bookTitle.error ? (
                            <div className="alert alert-danger" role="alert">{errors.bookTitle.message}</div>
                            ) : null}
                </div>

                <div className="form-group">
                    <label htmlFor="bookDesc">Book Desc</label>
                    <textarea
                    className="form-control"
                    type="bookDesc"
                    aria-label="bookDesc"
                    name="bookDesc"
                    placeholder="book description"
                    value={form.bookDesc}
                    onChange={onUpdateField}
                    />

                    {errors.bookDesc.dirty && errors.bookDesc.error ? (
                            <div className="alert alert-danger" role="alert">{errors.bookDesc.message}</div>
                            ) : null}
                </div>

                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input
                    className="form-control"
                    type="author"
                    aria-label="author"
                    name="author"
                    placeholder="book author"
                    value={form.author}
                    onChange={onUpdateField}
                    />

                    {errors.author.dirty && errors.author.error ? (
                            <div className="alert alert-danger" role="alert">{errors.author.message}</div>
                            ) : null}
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block" type="submit">
                    Save Book
                    </button>
                </div>

                {message ? 
                  <div className="alert alert-danger" role="alert">{message}</div>
                : null}
            </form>
        </div>
        <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Book Saved successfully"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Book was saved successfully
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

export default BookSaveForm;