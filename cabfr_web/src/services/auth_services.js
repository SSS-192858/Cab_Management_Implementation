import axios from "axios";
import authHeader from "./auth_header";

const API_URL = "http://localhost:8080/";

export const login = async(username, password) => {
    const response = await axios
        .post(API_URL + "authenticate", {
            username,
            password
        });
    if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("user");
};

export const registerAdmin = async(username, password) => {

    await axios.post(API_URL + "register_admin", {
        username,
        password
    }, { headers: { Authorization: "Bearer " + authHeader() } });

    return "Admin added successfully";
};

export const registerDriver = async(username, password, driverName, email, phone) => {
    const response = await axios.post(API_URL + "register_driver", {
        username,
        password
    }, {headers: {Authorization: "Bearer "+authHeader()}});

    var token = "";

    if (response.data.token) {
        token = response.data.token;
    }

    await axios.post(API_URL + "driver/save", {
        driverName,
        email,
        phone
    }, { headers: { Authorization: "Bearer " + token } });

    return "Signup successful";
}

export const registerCustomer = async(username, password, customerName, email, phone) => {
    const response = await axios.post(API_URL + "register_customer", {
        username,
        password
    });

    var token = "";

    if (response.data.token) {
        token = response.data.token;
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    await axios.post(API_URL + "customer/save", {
        customerName,
        email,
        phone
    }, { headers: { Authorization: "Bearer " + token } });

    return "Signup successful";
}

export const saveCab = async(reg_no, model, colour, fare) => {
    var token = authHeader();
    await axios.post(API_URL + "cabs/addCab", {
        reg_no,
        model,
        colour,
        fare
    }, { headers: { Authorization: "Bearer " + token } });

    return "Cab has been registered";
}

export const deleteCab = async(reg_no) => {
    var token = authHeader();
    await axios.delete(API_URL + `cabs/delete/${reg_no}`, { headers: { Authorization: "Bearer " + token } })
    return "Cab Successfully Deleted";
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

export const updateCab = async(reg_no, model, colour, fare) => {
    var token = authHeader();

    await axios.put(API_URL + "cabs/updateCab", {
        reg_no,
        model,
        colour,
        fare
    }, { headers: { Authorization: "Bearer " + token } });

    return "Cab details updated successfully";
}

export const deleteDriver = async(driverId) => {
    await axios.delete(API_URL + `driver/delete/${driverId}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return "Driver Deleted Successfully";
}

export const deleteCustomer = async(customerID) => {
    await axios.delete(API_URL + `customer/delete/${customerID}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return "Customer Deleted Successfully";
}

export const updateDriver = async(id, driverName, email, phone) => {
    var token = authHeader();

    await axios.put(API_URL + "driver/update", {
        id,
        driverName,
        email,
        phone
    }, { headers: { Authorization: "Bearer " + token } });

    return "Data saved successfully";
}

export const updateCustomer = async(id, customerName, email, phone) => {
    var token = authHeader();

    await axios.put(API_URL + "customer/update", {
        id,
        customerName,
        email,
        phone
    }, { headers: { Authorization: "Bearer " + token } });

    return "Data saved successfully";
}