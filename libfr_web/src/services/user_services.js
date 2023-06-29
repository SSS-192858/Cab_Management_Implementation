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
    console.log(cabs.data);
    return cabs.data;
}

export const getCabById = async(reg_no) => {
    const response = await axios.get(API_URL + "cabs/" + reg_no, { headers: { Authorization: "Bearer " + authHeader() } });
    console.log(response.data)
    return response.data;
}

// back end code for getting the driver with user ID needed.
export const getDriverById = async(id) => {
    var token = authHeader();
    console.log(token);
    const response = await axios.get(API_URL + "driver/getDriver/" + id, { headers: { Authorization: "Bearer " + token } });
    console.log(response.data)
    return response.data;
}

export const getDrivers = async() => {
    const response = await axios.get(API_URL + `driver/getAll`, { headers: { Authorization: "Bearer " + authHeader() } });
    console.log(response.data)
    return response.data;
}

export const getCustomers = async() => {
    const response = await axios.get(API_URL + `customer/getAll`, { headers: { Authorization: "Bearer " + authHeader() } });
    console.log(response.data)
    return response.data;
}
export const getBooksStudents = async() => {
    const response = await axios.get(API_URL + `bookStudent/getAll`, { headers: { Authorization: "Bearer " + authHeader() } });
    console.log(response.data)
    return response.data;
}

export const getBooksStudentsByBookCode = async(id) => {
    const response = await axios.get(API_URL + `bookStudent/book/${id}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

export const getBooksStudentsByStudentId = async(id) => {
    var token = authHeader();
    const response = await axios.get(API_URL + `bookStudent/student/${id}`, { headers: { Authorization: "Bearer " + token } });
    return response.data;
}

export const getBooksStudentsById = async(id) => {
    const response = await axios.get(API_URL + `bookStudent/${id}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

export const deleteBookStudent = async(id) => {
    await axios.delete(API_URL + `bookStudent/delete/${id}`, { headers: { Authorization: "Bearer " + authHeader() } });
}