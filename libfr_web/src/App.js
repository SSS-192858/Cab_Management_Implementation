import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { getCurrentUser, logout } from './services/auth_services';
import { useEffect, useState } from 'react';
import LoginForm from './components/loginForm';
import Home from './components/home';
import BoardUser from './components/BoardUser';
import BoardAdmin from "./components/BoardAdmin";

import SignupAdmin from "./components/SignupAdmin";
import BooksList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import BookSaveForm from "./components/BookSaveForm";
import BookUpdateForm from "./components/BookUpdate";
import UpdateStudent from "./components/StudentUpdateForm";
import StudentList from "./components/StudentList";
import StudentDetails from "./components/StudentDetails";
import RequestList from "./components/RequestList";
import BookStudentList from "./components/BookStudentList";
import BookRequestForm from "./components/BookRequestForm";
import RequestDetails from "./components/RequestDetails";
import BookStudentDetails from "./components/BookStudentDetails"

function App() {

  const [isAdmin, setIsAdmin] = useState(false);
  const [isDriver, setIsDriver] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  
  const [currentUser, setCurrentUser] = useState(null);

  const resolveLogin = () => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsAdmin(user.user.roles[0].name === "ADMIN");
      setIsCustomer(user.user.roles[0].name === "CUSTOMER");
      setIsDriver(user.user.roles[0].name === "DRIVER")
    }
  };

  const Applogout = () => {
    logout();
    setCurrentUser(null);
    setIsAdmin(false);
    // setIsStudent(false);
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
            Library
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {isAdmin && (
              <>
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
              <li className="nav-item">
              <Link to={"/booksSave"} className="nav-link">
                Save a Book
              </Link>
            </li>
            </>
            )}

            {isStudent && (
              <>
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User Board
                  </Link>
                </li>
              </>
            )}

            {currentUser ? (
            <li className="nav-item">
              <Link to={"/books"} className="nav-link">
                Books
              </Link>
            </li>
            
            ): null}

            {isAdmin && (
              <>
                <li className="nav-item">
                  <Link to={"/allRequests"} className="nav-link">
                    Requests
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/students"} className="nav-link">
                    Students
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/bookStudentList"} className="nav-link">Book Issue info</Link>
                </li>
              </>

            )}

          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              
              {isAdmin && (
                <li>
                  <a href = "/registerAdmin" className="nav-link">
                    Register New Admin
                  </a>
                </li>
              )}

              {isStudent &&(
                <>
                <li className="nav-item">
                  <Link to={"/requestsForStudent"} className="nav-link">
                    Pending Requests
                  </Link>
                </li>


                <li className="nav-item">
                  <Link to={"/bookStudentByStudent"} className="nav-link">
                    Issued Books
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/studentDetail"} className="nav-link">
                    Profile
                  </Link>
                </li>
                </>   
              )}

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

              <li className="nav-item">
                <Link to={"/registerStudent"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginForm setCurrentUser = {setCurrentUser} setIsAdmin = {setIsAdmin} setIsStudent = {setIsStudent}/>} />
            <Route path="/registerStudent" element={<SignupStudent />} />
            <Route path="/registerAdmin" element={<SignupAdmin />} />
            <Route path="/cabs" element={<BooksList/>}/>
            <Route path="/moreInfo" element={<BookDetails isStudent={isStudent} isAdmin={isAdmin}/>} />
            <Route path="/booksSave" element={<BookSaveForm/>}/>
            <Route path="/cabsUpdate" element={<BookUpdateForm/>}/>
            <Route path="/students" element={<StudentList/>}/>
            <Route path="/updateStudent" element={<UpdateStudent/>} />
            <Route path="/studentDetail" element={<StudentDetails isStudent={isStudent} isAdmin={isAdmin}/>}/>
            <Route path="/cabRequest" element={<BookRequestForm/>}/>
            <Route path="/allRequests" element={<RequestList choice={1}/>} />
            <Route path="/requestDetails" element={<RequestDetails isStudent={isStudent} isAdmin={isAdmin} />} />
            <Route path="/requestsForCab" element={<RequestList choice={2}/>}/>
            <Route path="/cabCustomerDetail" element={<BookStudentDetails isAdmin={isAdmin}/>}/>
            <Route path="/bookStudentList" element={<BookStudentList choice={1}/>}/>
            <Route path="/bookStudentByStudent" element={<BookStudentList choice={2} />}/>
            <Route path="/bookStudentByBook" element={<BookStudentList choice={3} />}/>
            <Route path="/requestsForStudent" element={<RequestList choice={3}/>}/>
            <Route path="/user" element={<BoardUser />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
