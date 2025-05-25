import axiosInstance from "../utils/axiosInstance";

export const loginUserApi = async (email, password) => {
    const {data} = await axiosInstance.post('/api/v1/auth', {email, password});
    return data;
};

export const registerUserApi = async (name, password, email) => {
    const {data} = await axiosInstance.post('/api/auth/register', {name, password, email});
    return data;
}

export const logoutUserApi = async () => {
    const {data} = await axiosInstance.get("/api/auth/logout")
    return data
}

export const getCurrentUserApi = async () => {
    const {data} = await axiosInstance.get("/api/auth/me")
    return data
}

export const getAllUserUrlsApi = async () => {
    const {data} = await axiosInstance.post("/api/user/urls")
    return data
}