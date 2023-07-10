import React, {useState, useEffect} from 'react'
import CustomerListItem from '../common/customerListItem';
import { getCustomers} from '../services/user_services';

//function to show the list of customers registered with the ca management service
function CustomerList(){

    const [customers, setCustomers] = useState([]);

    //customers are fetched from the backend
  const getcustomersComp = async () => {
    const response = await getCustomers();
    setCustomers(response);
  }

  useEffect(() => {
    getcustomersComp();
  },[])
  
  return (
    <>
    {/* if no customers, show banner saying nothing to show, else show the list of customers */}
    { (customers.length === 0) ? <div className='container banner'>
            <header className='jumbotron banner'> 
            <h5>Nothing to show</h5>
            </header>
        </div>
            : null
        }
    <div className='container'>
      <div className='row'>
        {customers.map((data) => (
          <div id="space" key= {data.id} className='col-lg-4 col-sm-12 col-md-6'><CustomerListItem customer={data}/></div>
        ))}
      </div>
    </div>
    </>
  );
}

export default CustomerList;