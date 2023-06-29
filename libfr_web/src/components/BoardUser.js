import React, { useState, useEffect } from "react";
import { getUserBoard } from "../services/user_services";

const BoardUser = () => {

    const [content, setContent] = useState("")

    useEffect(() => {
        getUserBoard().then(
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

export default BoardUser;