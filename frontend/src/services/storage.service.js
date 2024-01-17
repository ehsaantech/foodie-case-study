
const getUser = () => {
    const user = localStorage.getItem('foodies_user')
    return JSON.parse(user);
}

const saveUserToStorage = (user) => {
    if (!user) {
        return;
    }
    localStorage.setItem('foodies_user', JSON.stringify(user));
}

const saveTokenToStorage = (token) => {
    if (!token) {
        return;
    }
    localStorage.setItem('foodies_accessToken', token);
}

const getToken = () => {
    return localStorage.getItem('foodies_accessToken');
}

const clearStorage = () => {
    localStorage.clear();
}

export {
    getUser,
    getToken,
    saveUserToStorage,
    saveTokenToStorage,
    clearStorage
}