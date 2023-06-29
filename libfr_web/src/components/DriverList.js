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
    <ul id="remove">
      {drivers.map((data) => (
        <li id="space" key= {data.id}><DriverListItem driver={data}/></li>
      ))}
    </ul>
  );
}

export default DriverList;