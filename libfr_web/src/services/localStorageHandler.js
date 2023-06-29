export const setBookInStorage = (book) => {
    localStorage.setItem("book", JSON.stringify(book));
}

export const getBookFromStorage = () => {
    const book = JSON.parse(localStorage.getItem("book"));
    return book;
}

export const removeBookFromStorage = () => {
    localStorage.removeItem("book");
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

export const setBookStudentInStorage = (bookStudent) => {
    localStorage.setItem("bookStudent", JSON.stringify(bookStudent));
}

export const getBookStudentFromStorage = () => {
    const bookStudent = JSON.parse(localStorage.getItem("bookStudent"));
    return bookStudent;
}

export const removeBookStudentFromStorage = async () => {
    localStorage.removeItem("bookStudent");
}