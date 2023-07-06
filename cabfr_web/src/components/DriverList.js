import React, {useState, useEffect} from 'react'
import DriverListItem from '../common/DriverListItem';
import { getDrivers } from '../services/user_services';

function DriverList(){

  const [drivers, setDrivers] = useState([]);

  const getdriversComp = async () => {
    const response = await getDrivers();
    console.log(response)
    setDrivers(response);
  }

  useEffect(() => {
    getdriversComp();
  },[])
  
  return (
    <>
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
          <div id="space" key= {data.id} className='col-lg-4 col-sm-12 col-md-6'><DriverListItem driver={data} className='col-lg-4 col-sm-12 col-md-6'/></div>
        ))}
        </div>
      </div>
    </>
  );
}

export default DriverList;