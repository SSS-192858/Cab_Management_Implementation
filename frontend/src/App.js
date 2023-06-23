import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { getCurrentUser, logout } from './services/auth_services';
import { useEffect, useState } from 'react';
import LoginForm from './components/loginForm';
import Home from './components/home';
// import BoardUser from './components/BoardUser';
import BoardCustomer from "./components/BoardCustomer";
import BoardAdmin from "./components/BoardAdmin";
import BoardDriver from "./components/BoardDriver";

function App() {

  const [isAdmin, setIsAdmin] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [isDriver, setIsDriver] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const resolveLogin = () => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsAdmin(user.user.roles[0].name === "ADMIN");
      setIsDriver(user.user.roles[0].name === "DRIVER");
      setIsCustomer(user.user.roles[0].name === "CUSTOMER");
    }
  };

  const Applogout = () => {
    logout();
    setCurrentUser(null);
    setIsAdmin(false);
    setIsCustomer(false);
    setIsDriver(false);
  }

  useEffect(() => {
    resolveLogin();
  }, []);
  
  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {isAdmin && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {isCustomer && (
              <li className="nav-item">
                <Link to={"/customer"} className="nav-link">
                  Customer Board
                </Link>
              </li>
            )}
          

            {isDriver && (
              <li className="nav-item">
              <Link to={"/driver"} className="nav-link">
                Driver Board
              </Link>
            </li>
            )}
          
          </div>
            
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={Applogout}>
                  Log out
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              {/* <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li> */}
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginForm setCurrentUser = {setCurrentUser} setIsAdmin = {setIsAdmin} setIsCustomer = {setIsCustomer} setIsDriver={setIsDriver}/>} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/customer" element={<BoardCustomer/>} />
            <Route path="/admin" element={<BoardAdmin/>}/>
            <Route path="/driver" element={<BoardDriver/>}/>
          </Routes>
        </div>
      </div>
  );
}

export default App;
