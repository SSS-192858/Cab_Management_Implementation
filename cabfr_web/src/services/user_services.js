import axios from "axios";
import authHeader from "./auth_header";

const API_URL = "http://localhost:8080/";

export const getUserBoard = () => {
    return axios.get(API_URL + 'dummy_customers', { headers: { Authorization: "Bearer " + authHeader() } });
}

export const getDriverBoard = () => {
    return axios.get(API_URL + 'dummy_driver', { headers: { Authorization: "Bearer " + authHeader() } });
}

export const getAdminBoard = () => {
    return axios.get(API_URL + 'dummy_admin', { headers: { Authorization: "Bearer " + authHeader() } });
}

export const getCabs = async() => {
    const cabs = await axios.get(API_URL + "cabs/allCabs", { headers: { Authorization: "Bearer " + authHeader() } });
    return cabs.data;
}

export const getCabById = async(reg_no) => {
    const response = await axios.get(API_URL + "cabs/" + reg_no, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

// back end code for getting the driver with user ID needed.
export const getDriverById = async() => {
    var token = authHeader();
    const response = await axios.get(API_URL + "driver/getByUser", { headers: { Authorization: "Bearer " + token } });
    return response.data;
}

export const getCustomerById = async() => {
    var token = authHeader();
    const response = await axios.get(API_URL + "customer/getByUser", { headers: { Authorization: "Bearer " + token } });
    return response.data;
}

export const getDrivers = async() => {
    const response = await axios.get(API_URL + `driver/getAll`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

export const getCustomers = async() => {
    const response = await axios.get(API_URL + `customer/getAll`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}
export const getCustomerCabs = async() => {
    const response = await axios.get(API_URL + `customerCab/getAll`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

export const getCustomerCabsbyCabId = async(id) => {
    const response = await axios.get(API_URL + `customerCab/cab/${id}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

export const getCustomerCabsByCustomerId = async(id) => {
    var token = authHeader();
    const response = await axios.get(API_URL + `customerCab/customer/${id}`, { headers: { Authorization: "Bearer " + token } });
    return response.data;
}

export const getCustomerCabsByDriverId = async(id) => {
    var token = authHeader();
    const response = await axios.get(API_URL + `customerCab/driver/${id}`, { headers: { Authorization: "Bearer " + token } });
    return response.data;
}

export const getCustomerCabsById = async(id) => {
    const response = await axios.get(API_URL + `customerCab/${id}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}


export const deleteCustomerCabbyId = async(id) => {
    await axios.delete(API_URL + `customerCab/delete/${id}`, { headers: { Authorization: "Bearer " + authHeader() } });
}

export const getCabsByDriverId = async(id) => {
    const response = await axios.get(API_URL + `cabs/getByDriverId/${id}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

export const assignDriverToCab = async(reg_no, driver) => {
    const response = await axios.put(API_URL + `cabs/updateDriver/${reg_no}`, { id: driver.id, driverName: driver.driverName, email: driver.email, driver: driver.phone, user: driver.user }, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}


export const removeDriverFromCab = async(reg_no) => {
    const response = await axios.put(API_URL + `cabs/removeDriver/${reg_no}`,{}, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}
