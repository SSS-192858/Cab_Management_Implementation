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
    });

    var token = "";

    if (response.data.token) {
        token = response.data.token;
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    await axios.post(API_URL + "student/save", {
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
export const saveBook = async(bookTitle, bookDesc, author) => {
    var token = authHeader();
    await axios.post(API_URL + "books/save", {
        bookTitle,
        bookDesc,
        author
    }, { headers: { Authorization: "Bearer " + token } });

    return "Book Successfully Saved";
}

export const deleteBook = async(bookCode) => {
    var token = authHeader();
    await axios.delete(API_URL + `books/deleteBook/${bookCode}`, { headers: { Authorization: "Bearer " + token } })
    return "Book Successfully Deleted!";
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

export const updateBook = async(bookCode, bookTitle, bookDesc, author) => {
    var token = authHeader();

    await axios.put(API_URL + "books/updateBook", {
        bookCode,
        bookTitle,
        author,
        bookDesc
    }, { headers: { Authorization: "Bearer " + token } });

    return "Book Data updated successfully";
}

export const deleteDriver = async(driverId) => {

    await axios.delete(API_URL + `driver/delete/${driverId}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return "Driver Deleted Successfully";
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