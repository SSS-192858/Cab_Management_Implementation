import React, {useState} from "react";
import { useNavigate } from "react-router-dom/dist";
import { getCabFromStorage, getDriverFromStorage} from "../services/localStorageHandler";
import { assignDriverToCab } from "../services/user_services";

const AssignDriverConfirmation = () => {

    const [cab, setCab] = useState(() => {
        const temp = getCabFromStorage();
        return temp;
    })

    const [driver, setDriver] = useState(() => {
        const temp = getDriverFromStorage();
        return temp;
    })

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate("/assignDriver");
    }

    const handleAssign = () => {
        assignDriverToCab(cab.reg_no, driver);
        navigate("/cabs")
    }

    return (
        <>
            <p>{cab.reg_no}</p>
            <p>{cab.model}</p>
            <p>{cab.colour}</p>
            <p>{cab.fare}</p>
            <p>{driver.id}</p>
            <p>{driver.driverName}</p>
            <p>{driver.email}</p>
            <p>{driver.phone}</p>
            
            <button className="btn btn-primary btn-block" onClick={handleCancel}>
                Cancel
            </button>

            <button className="btn btn-primary btn-block" onClick={handleAssign}>
                Assign
            </button>
        </>
    )
}

export default AssignDriverConfirmation;