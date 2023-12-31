//the following things are stored in local storage to prevent loss when refreshed
//1. Current Cab
//2. Current Driver
//3. Logged in driver (when the driver is logged in, indicated by personal driver)
//4. Current Request
//5. Current CabCustomer record

//the following defines the methods to handle the same, i.e. set, get and remove from storage

export const setCabInStorage = (cab) => {
    localStorage.setItem("cab", JSON.stringify(cab));
}

export const getCabFromStorage = () => {
    const cab = JSON.parse(localStorage.getItem("cab"));
    return cab;
}

export const removeCabFromStorage = () => {
    localStorage.removeItem("cab");
}

export const setDriverInStorage = (driver) => {
    localStorage.setItem("driver", JSON.stringify(driver));
}

export const setPersonalDriverInStorage = (driver) => {
    localStorage.setItem("personalDriver", JSON.stringify(driver));
}

export const setCustomerInStorage = (customer) => {
    localStorage.setItem("customer", JSON.stringify(customer));
}

export const getPersonalDriverFromStorage = () => {
    const driver = JSON.parse(localStorage.getItem("personalDriver"));
    return driver;
}

export const getDriverFromStorage = () => {
    const driver = JSON.parse(localStorage.getItem("driver"));
    return driver;
}

export const getCustomerFromStorage = () => {
    const customer = JSON.parse(localStorage.getItem("customer"));
    return customer;
}

export const removeDriverFromStorage = () => {
    localStorage.removeItem("driver");
}

export const removePersonalDriverFromStorage = () => {
    localStorage.removeItem("personalDriver");
}

export const removeCustomerFromStorage = () => {
    localStorage.removeItem("customer");
}

export const setRequestInStorage = (request) => {
    localStorage.setItem("request", JSON.stringify(request));
}

export const getRequestFromStorage = () => {
    const request = JSON.parse(localStorage.getItem("request"));
    return request;
}

export const removeRequestFromStorage = () => {
    localStorage.removeItem("request");
}

export const setCustomerCabInStorage = (customerCab) => {
    localStorage.setItem("customerCab", JSON.stringify(customerCab));
}

export const getCustomerCabFromStorage = () => {
    const customerCab = JSON.parse(localStorage.getItem("customerCab"));
    return customerCab;
}

export const removeCustomerCabFromStorage = async () => {
    localStorage.removeItem("customerCab");
}