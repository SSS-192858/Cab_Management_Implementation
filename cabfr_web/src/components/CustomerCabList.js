import React from 'react';
import { useEffect, useState } from 'react';
import CustomerCabListItem from '../common/CustomerCabListItem';
import { getCustomerCabs, getCustomerCabsByCustomerId, getCustomerCabsByDriverId, getCustomerCabsbyCabId } from '../services/user_services';
import { getCabFromStorage, getCustomerFromStorage, getDriverFromStorage } from '../services/localStorageHandler';

const CustomerCabList = ({choice}) => {
  const [customerCabs, setcustomerCabs] = useState([]);
  var customer = null;
  var driver = null;
  var cab = null;

  const getRecords = async () => {
    if (choice === 1){
        const response = await getCustomerCabs();
        setcustomerCabs(response);
    }
    else if (choice === 2){
        customer = getCustomerFromStorage();
        const response = await getCustomerCabsByCustomerId(customer.id);
        setcustomerCabs(response);
    }
    else if (choice === 3){
        cab = getCabFromStorage();
        const response = await getCustomerCabsbyCabId(cab.reg_no);
        setcustomerCabs(response);
    }
    else if (choice === 4){
      driver = getDriverFromStorage();
      const response = await getCustomerCabsByDriverId(driver.id);
      setcustomerCabs(response);
    }
  }

  useEffect(() => {
    getRecords();
  },[])
    
  return (
    <>
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