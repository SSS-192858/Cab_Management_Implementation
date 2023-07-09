import authHeader from "./auth_header";
import axios from "axios";

const API_URL = "http://localhost:8080/";

export const getAllRequests = async () => {
    var token = authHeader();
    const responseList = await axios.get(API_URL+"requests/allRequests", {headers: {Authorization : "Bearer "+token}});
    return responseList.data;
}

export const getRequestByCustomerID = async(id) => {
    var token = authHeader();
    const responseList = await axios.get(API_URL+`requests/customer/${id}`, {headers: {Authorization: "Bearer "+token}});
    return responseList.data;
}

export const getRequestByCabCode = async(id) => {
    var token = authHeader();
    const responseList = await axios.get(API_URL+`requests/cab/${id}`, {headers: {Authorization: "Bearer "+token}});
    return responseList.data;
}

export const getRequestByDriverId = async(id)=>{
    var token = authHeader();
    const responseList = await axios.get(API_URL+`requests/driver/${id}`,{headers: {Authorization: "Bearer "+token}});
    return responseList.data;
}
export const getRequestById = async (request_id) => {
    const response = await axios.get(API_URL + `requests/${request_id}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

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

export const deleteRequest = async(slno) => {
    const response = await axios.delete(API_URL+`requests/delete/${slno}`,{headers:{Authorization:"Bearer "+authHeader()}});
}

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