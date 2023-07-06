import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Home = ({currentUser}) => {

    const navigate =useNavigate();

    useEffect(()=>{
        const func=()=>{
            if(currentUser){
                navigate("/cabs")
            }
            else
            {
                navigate("/login")
            }
        }
        func();
    },[])
    return (
        <>
        </>
    );
  
}

export default Home;