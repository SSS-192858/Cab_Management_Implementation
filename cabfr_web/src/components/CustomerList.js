import React, {useState, useEffect} from 'react'
import CustomerListItem from '../common/customerListItem';
import { getCustomers} from '../services/user_services';

function CustomerList(){

    const [customers, setCustomers] = useState([]);

  const getcustomersComp = async () => {
    const response = await getCustomers();
    setCustomers(response);
  }

  useEffect(() => {
    getcustomersComp();
  },[])
  
  return (
    <>
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