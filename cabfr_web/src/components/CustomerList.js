import React, {useState, useEffect} from 'react'
import CustomerListItem from '../common/customerListItem';
import { getCustomers} from '../services/user_services';

function CustomerList(){

    const [customers, setCustomers] = useState([]);

  const getcustomersComp = async () => {
    const response = await getCustomers();
    console.log(response)
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
    <ul id="remove">
      {customers.map((data) => (
        <li id="space" key= {data.id}><CustomerListItem customer={data}/></li>
      ))}
    </ul>
    </>
  );
}

export default CustomerList;