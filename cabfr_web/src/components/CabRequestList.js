import React, {useState} from "react";
import { getAllRequests, getRequestByCabCode, getRequestByCustomerID, getRequestByDriverId} from "../services/request_services";
import { useEffect } from "react";
import {getCabFromStorage, getCustomerFromStorage, getDriverFromStorage} from "../services/localStorageHandler";
import CabRequestListItem from "../common/CabRequestListItem";

const CabRequestList = ({choice}) => {
    const [requests, setRequests] = useState([]);
    var cab = null;
    var customer = null;
    var driver = null;
    const getRequests = async() => {
        if (choice === 1){
            const list = await getAllRequests();
            setRequests(list);
        }else if (choice === 2){
            cab = getCabFromStorage();
            const list = await getRequestByCabCode(cab.reg_no);
            setRequests(list);
        }else if (choice === 3){
            customer =  getCustomerFromStorage();
            const list = await getRequestByCustomerID(customer.id);
            setRequests(list);
        }
        else if(choice === 4){
            driver = await getDriverFromStorage();
            const list = await getRequestByDriverId(driver.id);
            setRequests(list);
        }
    }

    useEffect(() => {
        getRequests();
    }, [])

    return (
    <>
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