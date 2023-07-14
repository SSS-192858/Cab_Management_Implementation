import React, {useState} from "react";
import { getAllRequests, getRequestByCabCode, getRequestByCustomerID, getRequestByDriverId} from "../services/request_services";
import { useEffect } from "react";
import {getCabFromStorage, getCustomerFromStorage, getDriverFromStorage, getPersonalDriverFromStorage} from "../services/localStorageHandler";
import CabRequestListItem from "../common/CabRequestListItem";

//component to show the list of cabs requested
const CabRequestList = ({choice}) => {
    const [requests, setRequests] = useState([]);
    var cab = null;
    var customer = null;
    var driver = null;

    //choice prop decides what to show
    const getRequests = async() => {
        if (choice === 1){
            //if choice = 1, show all requests
            const list = await getAllRequests();
            setRequests(list);
        }else if (choice === 2){
            //if choice = 2, show requests by cab registration number
            cab = getCabFromStorage();
            const list = await getRequestByCabCode(cab.reg_no);
            setRequests(list);
        }else if (choice === 3){
            //if choice = 3, show requests by customer id
            customer =  getCustomerFromStorage();
            const list = await getRequestByCustomerID(customer.id);
            setRequests(list);
        }
        else if(choice === 4){
            //else if choice = 4, show requests for cabs assigned to a driver
            driver = await getPersonalDriverFromStorage();
            const list = await getRequestByDriverId(driver.id);
            setRequests(list);
        }
    }

    useEffect(() => {
        getRequests();
    }, [choice])

    return (
    <>
    {/* Render list of requests on screen, if no requests, show banner saying "Nothing to show" */}
        { (requests.length === 0) ? <div className='container banner'>
            <header className='jumbotron banner'> 
                <h5>Nothing to show</h5>
            </header>
        </div>
            : null
      }
        <div className="container">
            <div className="row">
                {requests.map((data) => (
                    <div id="space" key= {data.id} className='col-lg-4 col-sm-12 col-md-6'><CabRequestListItem request={data}/></div>
                ))}
            </div>
        </div>
    </>
    )
}

export default CabRequestList;