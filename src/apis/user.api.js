import axiosInstance from "../utils/axiosInstance";

export const loginUserApi = async (email, password) => {
    try {
        const {data} = await axiosInstance.post('/api/v1/auth/login', {email, password});
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const registerUserApi = async (name, password, email) => {
   try {
        const {data} = await axiosInstance.post('/api/v1/auth/register', {name, password, email});
        return data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const logoutUserApi = async () => {
    try {
        const {data} = await axiosInstance.get("/api/v1/auth/logout")
        return data
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const getCurrentUserApi = async () => {
   try {
        const {data} = await axiosInstance.get("/api/v1/auth/me")
        return data
    } catch (error) {
        console.log(error)
        throw error;
   }
}

export const getAllUserUrlsApi = async () => {
    try {
        const {data} = await axiosInstance.post("/api/v1/user/urls")
        return data
    } catch (error) {
        console.log(error);
        throw error;
    }
}