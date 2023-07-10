import authHeader from "./auth_header";
import axios from "axios";

const API_URL = "http://localhost:8080/";

//to get all cab requests stored in database
export const getAllRequests = async () => {
    var token = authHeader();
    const responseList = await axios.get(API_URL+"requests/allRequests", {headers: {Authorization : "Bearer "+token}});
    return responseList.data;
}

//to get all cabs requested by a given customer
export const getRequestByCustomerID = async(id) => {
    var token = authHeader();
    const responseList = await axios.get(API_URL+`requests/customer/${id}`, {headers: {Authorization: "Bearer "+token}});
    return responseList.data;
}

//to get requests for a particular cab, using reg no
export const getRequestByCabCode = async(id) => {
    var token = authHeader();
    const responseList = await axios.get(API_URL+`requests/cab/${id}`, {headers: {Authorization: "Bearer "+token}});
    return responseList.data;
}

//to get requests for the cabs assigned to a driver, using driver id
export const getRequestByDriverId = async(id)=>{
    var token = authHeader();
    const responseList = await axios.get(API_URL+`requests/driver/${id}`,{headers: {Authorization: "Bearer "+token}});
    return responseList.data;
}

//to get request by id
export const getRequestById = async (request_id) => {
    const response = await axios.get(API_URL + `requests/${request_id}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

//to add a new request for a cab
export const registerRequest = async(customer,cab,startDate,endDate)=>{
    await axios.post(API_URL+`requests/save`,{
        customer,
        cab,
        startDate,
        endDate
    } , {headers:{Authorization:"Bearer "+authHeader()}}
    );

    return "Request Added Successfully";
}

//to delete request for a cab, using the request's serial number
export const deleteRequest = async(slno) => {
    const response = await axios.delete(API_URL+`requests/delete/${slno}`,{headers:{Authorization:"Bearer "+authHeader()}});
}

//to accept a particular request, and create a CustomerCab record using it
export const accept = async(request) => {
    const response = await axios.post(API_URL+`customerCab/accept`,{
        id : request.id,
        cab : request.cab,
        customer: request.customer,
        startDate: request.startDate,
        endDate: request.endDate
    }, {headers:{Authorization:"Bearer "+authHeader()}});
    return response.data;
}