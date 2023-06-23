import React, { useState, useEffect } from "react";
// import { getAdminBoard } from "../services/user_services";
import { getDriverBoard } from "../services/user_services";
const BoardDriver = () => {

    const [content, setContent] = useState("")

    useEffect(() => {
        getDriverBoard().then(
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

export default BoardDriver;