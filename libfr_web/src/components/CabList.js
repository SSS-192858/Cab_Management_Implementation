import React from 'react';
import { useEffect, useState } from 'react';
import { getCabs } from '../services/user_services';
import CabListItem from '../common/cabListItem';
function CabList() {
  const [cabs, setCabs] = useState([]);

  const getCabsComp = async () => {
    const response = await getCabs();
    setCabs(response);
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