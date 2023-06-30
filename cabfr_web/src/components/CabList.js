import React from 'react';
import { useEffect, useState } from 'react';
import { getCabs, getCabsByDriverId } from '../services/user_services';
import CabListItem from '../common/cabListItem';
import { getDriverFromStorage } from '../services/localStorageHandler';
function CabList({choice}) {
  const [cabs, setCabs] = useState([]);

  const [driver, setDriver] = useState(() => {
    const temp = getDriverFromStorage();
    return temp;
  })

  const getCabsComp = async () => {
    if (choice === 1){
      const response = await getCabs();
      setCabs(response);
    }else{
      const response = await getCabsByDriverId(driver.id);
      setCabs(response);
    }   
  }

  useEffect(() => {
    getCabsComp();
  },[])
    
  return (
    <ul id="remove">
      {cabs.map((data) => (
        <li id="space" key= {data.reg_no}><CabListItem cab={data}/></li>
      ))}
    </ul>
  );
}

export default CabList;