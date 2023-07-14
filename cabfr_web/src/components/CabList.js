import React from 'react';
import { useEffect, useState } from 'react';
import { getCabs, getCabsByDriverId } from '../services/user_services';
import CabListItem from '../common/cabListItem';
import { getDriverFromStorage, getPersonalDriverFromStorage } from '../services/localStorageHandler';

//component to display the list of cabs
function CabList({ choice }) {
    const [cabs, setCabs] = useState([]);

    //driver retrieved from storage
    const [driver, setDriver] = useState(() => {
        const temp = getPersonalDriverFromStorage();
        return temp;
    })

    //when choice = 1, we show all cabs, else show the cabs for a given driver
    const getCabsComp = async() => {
        if (choice === 1) {
            const response = await getCabs();
            setCabs(response);
        } else {
            const response = await getCabsByDriverId(driver.id);
            setCabs(response);
        }
    }

    useEffect(() => {
        getCabsComp();
    }, [choice])

    return ( <> 
    {/* to show the list of cabs, if no cabs, show banner saying "Nothing to show" */}
            {(cabs.length === 0) ? <div className = 'container banner'>
            <header className = 'jumbotron banner' >
            <h5 > Nothing to show </h5> </header>
            </div> :
                null
        } 
        <div className = "container">
        <div className = 'row' > 
        {cabs.map((data) => 
            ( <div id = "space"
                key = { data.reg_no }
                className = 'col-lg-4 col-sm-12 col-md-6' > <CabListItem cab = { data }/></div >
            ))
        } 
        </div></div> 
        </>
    );
}

export default CabList;