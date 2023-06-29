import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { deleteBookStudent } from "../services/user_services";
import { useNavigate } from "react-router-dom";
import { getBookStudentFromStorage } from "../services/localStorageHandler";

const BookStudentDetails = ({isAdmin}) => {

    const [bookStudent, setBookStudent] = useState(() => {
        const temp = getBookStudentFromStorage();
        return temp;
    })

    console.log(bookStudent);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleToClose = () => {
        deleteBookStudent(bookStudent.slno);
        setOpen(false);
        navigate("/booksStudent");
    };

    const handleCancel = ()=>{
        setOpen(false);
    }

    return (
        <div>
            <div className="book">
                <p>{bookStudent.slno}</p>
                <p>
                    Book Details :
                </p>
                <p>{bookStudent.book.bookCode}</p>
                <p>{bookStudent.book.bookTitle}</p>
                <p>{bookStudent.book.author}</p>
                <p>{bookStudent.book.bookDesc}</p>

                <p>
                    Student Details :
                </p>

                <p>{bookStudent.student.id}</p>
                <p>{bookStudent.student.studentName}</p>
                <p>{bookStudent.student.email}</p>
                <p>{bookStudent.student.phone}</p>

                <p>
                    Start Date : {bookStudent.startDate}
                </p>
                <p>
                    End Date : {bookStudent.endDate}
                </p>
            {isAdmin && 
            <button onClick={()=>{setOpen(true)}} className="btn btn-primary btn-block" type="submit">
                Delete BookStudent
            </button>
            }   
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Delete BookStudent"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this record?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleCancel} color="primary" autoFocus>
                        Cancel
                    </button>
                    <button onClick={handleToClose}
                        color="primary" autoFocus>
                        Delete BookStudent
                    </button>
                </DialogActions>
            </Dialog>
            </div>
    </div>
    )
}

export default BookStudentDetails;