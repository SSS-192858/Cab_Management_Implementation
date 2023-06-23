import React, { useState, useEffect } from "react";
// import { getUserBoard } from "../services/user_services";
import { getCustomerBoard } from "../services/user_services";

const BoardCustomer = () => {

    const [content, setContent] = useState("")

    useEffect(() => {
        getCustomerBoard().then(
            response => {
                setContent(response.data);
            },
            error => {
                const msg = (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();

                setContent(msg);
            }
        )
        
    }, [])

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{content}</h3>
        </header>
      </div>
    );
  
}

export default BoardCustomer;