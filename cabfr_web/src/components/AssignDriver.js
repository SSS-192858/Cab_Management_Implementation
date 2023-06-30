import React, { useState, useEffect } from "react";
import { getCabFromStorage } from "../services/localStorageHandler";
import { getDrivers } from "../services/user_services";
import DriverAssignItem from "../common/DriverAssignItem";

const AssignDriver = () => {

    const [cab, setCab] = useState(() => {
        const response = getCabFromStorage();
        return response;
    })

    const [drivers, setDrivers] = useState([]);

    const getdriversComp = async() => {
        const response = await getDrivers();
        console.log(response)
        setDrivers(response);
    }

    useEffect(() => {
        getdriversComp();
    }, [])

    return (
        <>
        <div className="container">
            <header className="jumbotron">
                <h3>Pick Driver to assign to cab {cab.reg_no}</h3>
            </header>
        </div>

        <ul id="remove">
            {drivers.map((data) => (
                <li id="space" key= {data.id}><DriverAssignItem driver={data} cab={cab}/></li>
            ))}
        </ul>
        </>
    )

}

export default AssignDriver;