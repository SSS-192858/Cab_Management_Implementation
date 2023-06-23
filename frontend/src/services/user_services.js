import axios from "axios";
import authHeader from "./auth_header";

const API_URL = "http://localhost:8080/";

export const getCustomerBoard = () => {
    return axios.get(API_URL + 'dummy_customers', { headers: {Authorization : "Bearer "+authHeader()} });
}
export const getAdminBoard = () => {
    return axios.get(API_URL + 'dummy_admin', { headers: {Authorization : "Bearer "+authHeader()} });
}
export const getDriverBoard = () =>{
    return axios.get(API_URL+'dummy_driver', { headers:{Authorization: "Bearer "+authHeader()}});
}
