import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { getCurrentUser, logout } from './services/auth_services';
import { useEffect, useState } from 'react';
import LoginForm from './components/loginForm';
import Home from './components/home';
import SignupAdmin from "./components/SignupAdmin";
import CabDetails from "./components/CabDetails";
import UpdateCustomer from "./components/CustomerUpdateForm";
import CustomerList from "./components/CustomerList";
import CustomerDetails from "./components/CustomerDetails";
import CabRequestList from "./components/CabRequestList";
import CustomerCabList from "./components/CustomerCabList";
import CabRequestForm from "./components/CabRequestForm";
import CabRequestDetails from "./components/CabRequestDetails";
import SignupCustomer from "./components/SignupCustomer";
import SignupDriver from "./components/SignupDriver";
import CabSaveForm from "./components/CabSaveForm";
import CabList from "./components/CabList";
import CabUpdateForm from "./components/CabUpdate";
import DriverList from "./components/DriverList";
import DriverDetails from "./components/DriverDetails";
import UpdateDriver from "./components/DriverUpdateForm";
import CustomerCabDetail from "./components/CustomerCabDetails";
import AssignDriver from "./components/AssignDriver";
import AssignDriverConfirmation from "./components/AssignDriverConfirmation";
import { removeCabFromStorage, removeCustomerCabFromStorage, removeDriverFromStorage, removePersonalDriverFromStorage, removeRequestFromStorage } from "./services/localStorageHandler";
import PersonalDriverDetails from "./components/PersonalDriverDetails";

function App() {

  // isAdmin variable that will be used to see the if the currently logged-in user is Admin or not.
  const [isAdmin, setIsAdmin] = useState(()=>{
    const user = getCurrentUser();
    if (user && user.user && user.user.roles[0] && user.user.roles[0].name && user.user.roles[0].name === "ADMIN"){
      return true;
    }else{
      return false;
    }
  });
  // isDriver variable that will be used to see if the currently logged in user is Driver or not.
  const [isDriver, setIsDriver] = useState(()=>{
    const user = getCurrentUser();
    if (user && user.user && user.user.roles[0] && user.user.roles[0].name && user.user.roles[0].name === "DRIVER"){
      return true;
    }else{
      return false;
    }
  });
  //  isCustomer variable that will be used to see if the currently logged in user is Customer or not.
  const [isCustomer, setIsCustomer] = useState(()=>{
    const user = getCurrentUser();
    if (user && user.user && user.user.roles[0] && user.user.roles[0].name && user.user.roles[0].name === "CUSTOMER"){
      return true;
    }else{
      return false;
    }
  });
  // this will contain the current logged in user.
  const [currentUser, setCurrentUser] = useState(()=>{
    const temp = getCurrentUser();
    return temp;
  });

  // resolve login function that will set up the variables.
  const resolveLogin = () => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsAdmin(user.user.roles[0].name === "ADMIN");
      setIsCustomer(user.user.roles[0].name === "CUSTOMER");
      setIsDriver(user.user.roles[0].name === "DRIVER")
    }
  };

  // loggout function that will remove all the data from the local storage and the set the 
  // variables to its default value.
  const Applogout = () => {
    logout();
    setCurrentUser(null);
    setIsAdmin(false);
    setIsCustomer(false);
    setIsDriver(false);
    removeCabFromStorage();
    removeCustomerCabFromStorage();
    removeDriverFromStorage();
    removeRequestFromStorage();
    removePersonalDriverFromStorage();
  }

  // calling resolve login function during the time page is loading.
  useEffect(() => {
    resolveLogin();
  }, []);
  
  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark nav">
          {/* Link to home page  */}
          <Link to={"/"} className="navbar-brand">
            Cab Company
          </Link>
          <div className="navbar-nav mr-auto">

            {currentUser && (
              <li className="nav-item">
              <Link to={"/cabs"} className="nav-link">
                {/* This will show the list of cabs */}
                Cabs
              </Link>
              </li>
            )}

            {isAdmin && (
              <>
              <li className="nav-item">
              <Link to={"/cabsSave"} className="nav-link">
                {/* option to add a cab */}
                Add a Cab
              </Link>
            </li>
            </>
            )}


            {isAdmin && (
              <>
                <li className="nav-item">
                  <Link to={"/allRequests"} className="nav-link">
                    {/*List of Requests */}
                    Requests
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/customers"} className="nav-link">
                    {/* List of Customers */}
                    Customers
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/drivers"} className="nav-link">
                    {/* List of Drivers */}
                    Drivers
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/cabCustomerList"} className="nav-link">
                    {/* List of Customer-Cab bookings */}
                    Customer Cab Info
                    </Link>
                </li>
              </>

            )}

            

          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              {isAdmin && (
                <>
                <li>
                  <a href = "/registerAdmin" className="nav-link">
                    {/* Option to register a new Admin */}
                    Register New Admin
                  </a>
                </li>
              <li>
                <a href = "/registerDriver" className="nav-link">
                  {/* Option to register a new driver*/}
                  Register New Driver
                </a>
              </li>
              </>
              )}

              {isCustomer &&(
                <>
                
                <li className="nav-item">
                  <Link to={"/requestForCustomer"} className="nav-link">
                    {/* Option to see the pending Requests */}
                    Pending Requests
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/cabCustomerByCustomer"} className="nav-link">
                    {/* Option to see his/her Cab Appointments */}
                    Cab Appointments
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/customerDetail"} className="nav-link">
                    {/* Option to see profile  .*/}
                    Profile
                  </Link>
                </li>
                </>   
              )}

              {isDriver &&(
                <>
                <li className="nav-item">
                  <Link to={"/requestForDriver"} className="nav-link">
                    {/* Option to see the pending Requests. */}
                    Pending Requests
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/cabsforDriver"} className="nav-link">
                    {/* Option to see driver's cabs */}
                    See my cabs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/cabCustomerByDriver"} className="nav-link">
                    {/* Option to see his appointments */}
                    Cabs Appointments
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/personalDriverDetail"} className="nav-link">
                    {/* Option to see profile. */}
                    Profile
                  </Link>
                </li>
                </>   
              )}

              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={Applogout}>
                  {/* Log out function */}
                  Log out
                </a>
              </li>

            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  {/* Login function */}
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/registerCustomer"} className="nav-link">
                  {/* Sign up function */}
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home currentUser={currentUser} />} />
            <Route path="/home" element={<Home currentUser={currentUser}/>} />
            <Route path="/login" element={<LoginForm setCurrentUser = {setCurrentUser} setIsAdmin = {setIsAdmin} setIsDriver={setIsDriver} setIsCustomer = {setIsCustomer}/>} />
            <Route path="/registerCustomer" element={<SignupCustomer/>} />
            <Route path="/registerDriver" element={<SignupDriver/>} />
            <Route path="/registerAdmin" element={<SignupAdmin />} />
            <Route path="/cabs" element={<CabList choice={1}/>}/>
            <Route path="/cabsForDriver" element={<CabList choice={2}/>}/>
            <Route path="/cabDetails" element={< CabDetails isCustomer = {isCustomer} isAdmin={isAdmin} isDriver={isDriver}/>} />
            <Route path="/cabsSave" element={<CabSaveForm/>}/>
            <Route path="/cabsUpdate" element={<CabUpdateForm/>}/>
            <Route path="/cabRequest" element={<CabRequestForm/>}/>
            <Route path="/drivers" element={<DriverList/>}/>
            <Route path="/updateDriver" element={<UpdateDriver/>} />
            <Route path="/driverDetail" element={<DriverDetails isDriver={isDriver} isAdmin={isAdmin}/>}/>
            <Route path="/personalDriverDetail" element={<PersonalDriverDetails isDriver={isDriver} isAdmin={isAdmin}/>}/>
            <Route path="/customers" element={<CustomerList/>}/>
            <Route path="/updateCustomer" element={<UpdateCustomer/>} />
            <Route path="/customerDetail" element={<CustomerDetails isCustomer={isCustomer} isAdmin={isAdmin} />}/>
            <Route path="/allRequests" element={<CabRequestList choice={1}/>} />
            <Route path="/requestDetails" element={<CabRequestDetails isCustomer={isCustomer} isAdmin={isAdmin} isDriver={isDriver}/>} />
            <Route path="/requestsForCab" element={<CabRequestList choice={2}/>}/>
            <Route path="/requestForCustomer" element={<CabRequestList choice={3}/>}/>
            <Route path="/requestForDriver" element={<CabRequestList choice={4}/>}/>
            <Route path="/cabCustomerList" element={<CustomerCabList choice={1}/>}/>
            <Route path="/cabCustomerDetails" element={<CustomerCabDetail isAdmin={isAdmin}/>}/>
            <Route path="/cabCustomerByCustomer" element={<CustomerCabList choice={2}/>}/>
            <Route path="/cabCustomerByCab" element={<CustomerCabList choice={3} />}/>
            <Route path="/cabCustomerByDriver" element={<CustomerCabList choice={4}/>}/>
            <Route path="/assignDriver" element={<AssignDriver/>}/>
            <Route path="/assignDriverConfirmation" element={<AssignDriverConfirmation/>}/>
            {/* <Route path="/user" element={<BoardUser />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/driver" element={<BoardDriver />} /> */}
          </Routes>
        </div>
      </div>
  );
}

export default App;
