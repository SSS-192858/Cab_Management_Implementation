import React, {useState, useEffect} from 'react'
import DriverListItem from '../common/DriverListItem';
import { getDrivers } from '../services/user_services';

//function to show the list of drivers registered with the cab management service
function DriverList(){

  const [drivers, setDrivers] = useState([]);

  //drivers are fetched from the backend
  const getdriversComp = async () => {
    const response = await getDrivers();
    setDrivers(response);
  }

  useEffect(() => {
    getdriversComp();
  },[])
  
  return (
    <>
    {/* if no drivers, show banner saying nothing to show, else show the list of drivers */}
      { (drivers.length === 0) ? <div className='container banner'>
            <header className='jumbotron banner'> 
            <h5>Nothing to show</h5>
            </header>
        </div>
            : null
      }
      <div className='container'>
        <div className='row'>
        {drivers.map((data) => (
          <div id="space" key= {data.id} className='col-lg-4 col-sm-12 col-md-6'><DriverListItem driver={data}/></div>
        ))}
        </div>
      </div>
    </>
  );
}

export default DriverList;