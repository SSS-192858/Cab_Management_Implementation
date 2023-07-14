import React from 'react';
import { useEffect, useState } from 'react';
import CustomerCabListItem from '../common/CustomerCabListItem';
import { getCustomerCabs, getCustomerCabsByCustomerId, getCustomerCabsByDriverId, getCustomerCabsbyCabId } from '../services/user_services';
import { getCabFromStorage, getCustomerFromStorage, getDriverFromStorage } from '../services/localStorageHandler';

// will show all the bookings list.
const CustomerCabList = ({choice}) => {
  const [customerCabs, setcustomerCabs] = useState([]);
  var customer = null;
  var driver = null;
  var cab = null;

  // will get all the bookings based on options.
  const getRecords = async () => {
    if (choice === 1){
        // will get all bookings.
        const response = await getCustomerCabs();
        setcustomerCabs(response);
    }
    else if (choice === 2){
      // will get all bookings for a customer.
        customer = getCustomerFromStorage();
        const response = await getCustomerCabsByCustomerId(customer.id);
        setcustomerCabs(response);
    }
    else if (choice === 3){
      // will get all bookings for a cab.
        cab = getCabFromStorage();
        const response = await getCustomerCabsbyCabId(cab.reg_no);
        setcustomerCabs(response);
    }
    else if (choice === 4){
      // will get all bookings for a driver.
      driver = getDriverFromStorage();
      const response = await getCustomerCabsByDriverId(driver.id);
      setcustomerCabs(response);
    }
  }

  useEffect(() => {
    getRecords();
  },[choice])
    
  return (
    <>
    {/* Render list of customer cab list  on screen, if no customer cab list , show banner saying "Nothing to show" */}
      { (customerCabs.length === 0) ? <div className='container banner'>
              <header className='jumbotron banner'> 
                  <h5>Nothing to show</h5>
              </header>
          </div>
              : null
        }
      <div className='container'>
        <div className='row'>
        {customerCabs.map((data) => (
          <div id="space" key= {data.slno} className='col-lg-4 col-sm-12 col-md-6'><CustomerCabListItem customerCab={data}/></div>
        ))}
        </div>

      </div>
    </>
  );
}

export default CustomerCabList;