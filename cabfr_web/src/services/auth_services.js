import axios from "axios";
import authHeader from "./auth_header";

//requests are sent to localhost:8080, where the backend is running
const API_URL = "http://localhost:8080/";

//function to login using username and password, we get the user object and jwt token in return, which is stored in local storage
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

//log out involves removing item from local storage
export const logout = () => {
    localStorage.removeItem("user");
};

//registering admin account requires username and password.
export const registerAdmin = async(username, password) => {

    await axios.post(API_URL + "register_admin", {
        username,
        password
    }, { headers: { Authorization: "Bearer " + authHeader() } });

    return "Admin added successfully";
};

//for registering a new driver, we need to pass all details to create the user + driver accounts
export const registerDriver = async(username, password, driverName, email, phone) => {
    const response = await axios.post(API_URL + "register_driver", {
        username,
        password
    }, {headers: {Authorization: "Bearer "+authHeader()}});

    var token = "";

    //token is brought back, which is used to store the other driver details
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

//customer registration follows similar procedure as driver registration
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

//method to save a new cab to the database
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

//method to delete a cab from the database, uses the reg number of the cab to do so
export const deleteCab = async(reg_no) => {
    var token = authHeader();
    await axios.delete(API_URL + `cabs/delete/${reg_no}`, { headers: { Authorization: "Bearer " + token } })
    return "Cab Successfully Deleted";
}

//helper function to get user item from local storage
export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

//method to update the cab 
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

//method to delete a driver from the database, it subsequently also deletes the user record for the driver
export const deleteDriver = async(driverId) => {
    await axios.delete(API_URL + `driver/delete/${driverId}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return "Driver Deleted Successfully";
}

//to delete customer record, similar to driver 
export const deleteCustomer = async(customerID) => {
    await axios.delete(API_URL + `customer/delete/${customerID}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return "Customer Deleted Successfully";
}

//to update the details of the driver
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

//to update the details of the customer
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