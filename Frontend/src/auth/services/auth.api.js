import axios from "axios";

const api = axios.create({
    baseURL : "https://ai-interview-helper-mern.onrender.com",
    withCredentials : true
})

const register = async ({username, email, password}) => {
    try {
        const response = await api.post("/api/auth/register", {username, email, password});
        return response.data;
    } catch (error) {
        throw error;
    }
}
const login = async ({email, password}) => {
    try {
        const response = await api.post("/api/auth/login", {email, password});
        return response.data;
    } catch (error) {
        throw error;
    }
}
const logout = async () => {
    try {
        const response = await api.post("/api/auth/logout");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
const getUser = async() => {
    try {
        const response = await api.get("/api/auth/get-me");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export {
    register,
    login,
    logout,
    getUser
}