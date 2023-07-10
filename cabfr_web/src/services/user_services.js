import axios from "axios";
import authHeader from "./auth_header";

const API_URL = "http://localhost:8080/";

//to get all the cabs registered with the service
export const getCabs = async() => {
    const cabs = await axios.get(API_URL + "cabs/allCabs", { headers: { Authorization: "Bearer " + authHeader() } });
    return cabs.data;
}

//to get cab by the registration number
export const getCabById = async(reg_no) => {
    const response = await axios.get(API_URL + "cabs/" + reg_no, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

//to get driver details using the USER ID of the driver
export const getDriverById = async() => {
    var token = authHeader();
    const response = await axios.get(API_URL + "driver/getByUser", { headers: { Authorization: "Bearer " + token } });
    return response.data;
}

//to get customer details using the CUSTOMER ID of the customer
export const getCustomerById = async() => {
    var token = authHeader();
    const response = await axios.get(API_URL + "customer/getByUser", { headers: { Authorization: "Bearer " + token } });
    return response.data;
}

//to get all the drivers registered with the service
export const getDrivers = async() => {
    const response = await axios.get(API_URL + `driver/getAll`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

//to get all the customers registered with the service
export const getCustomers = async() => {
    const response = await axios.get(API_URL + `customer/getAll`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

//to get all the customer cab assignments 
export const getCustomerCabs = async() => {
    const response = await axios.get(API_URL + `customerCab/getAll`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

// to get customer cab records through the cab id
export const getCustomerCabsbyCabId = async(id) => {
    const response = await axios.get(API_URL + `customerCab/cab/${id}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

//to get customer cab records by customer id
export const getCustomerCabsByCustomerId = async(id) => {
    var token = authHeader();
    const response = await axios.get(API_URL + `customerCab/customer/${id}`, { headers: { Authorization: "Bearer " + token } });
    return response.data;
}

//to get customer cab records for the cabs assigned to a driver
export const getCustomerCabsByDriverId = async(id) => {
    var token = authHeader();
    const response = await axios.get(API_URL + `customerCab/driver/${id}`, { headers: { Authorization: "Bearer " + token } });
    return response.data;
}

//to get customer cab record by id 
export const getCustomerCabsById = async(id) => {
    const response = await axios.get(API_URL + `customerCab/${id}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

//to delete a customer cab record by id
export const deleteCustomerCabbyId = async(id) => {
    await axios.delete(API_URL + `customerCab/delete/${id}`, { headers: { Authorization: "Bearer " + authHeader() } });
}

//to get the cabs driven by a particular driver
export const getCabsByDriverId = async(id) => {
    const response = await axios.get(API_URL + `cabs/getByDriverId/${id}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

//to assign a driver to a given cab
export const assignDriverToCab = async(reg_no, driver) => {
    const response = await axios.put(API_URL + `cabs/updateDriver/${reg_no}`, { id: driver.id, driverName: driver.driverName, email: driver.email, driver: driver.phone, user: driver.user }, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

//to remove the driver assigned to a cab
export const removeDriverFromCab = async(reg_no) => {
    const response = await axios.put(API_URL + `cabs/removeDriver/${reg_no}`,{}, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}
