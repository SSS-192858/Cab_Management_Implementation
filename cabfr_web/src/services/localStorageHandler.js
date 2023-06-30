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

export const setCustomerInStorage = (customer) => {
    localStorage.setItem("customer", JSON.stringify(customer));
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