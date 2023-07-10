//function to get token from the user in local storage
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return user.token;
    } else {
        return {};
    }
}