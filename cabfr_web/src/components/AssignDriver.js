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

        <div className='container'>
          <div className='row'>

          {drivers.map((data) => (
            <div id="space" key= {data.id} className='col-lg-4 col-sm-12 col-md-6'><DriverAssignItem driver={data} cab={cab}/></div>
          ))}
          </div>
        </div>
        </>
    )

}

export default AssignDriver;