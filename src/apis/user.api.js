import axiosInstance from "../utils/axiosInstance";

export const loginUserApi = async (email, password) => {
    try {
        const {data} = await axiosInstance.post('/api/auth/login', {email, password});
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const registerUserApi = async (name, password, email) => {
   try {
        const {data} = await axiosInstance.post('/api/auth/register', {name, password, email});
        return data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const logoutUserApi = async () => {
    try {
        const {data} = await axiosInstance.get("/api/auth/logout")
        return data
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const getCurrentUserApi = async () => {
   try {
        const {data} = await axiosInstance.get("/api/auth/me")
        return data
    } catch (error) {
        console.log(error)
        throw error;
   }
}

export const getAllUserUrlsApi = async () => {
    try {
        const response = await axiosInstance.get("/api/user/urls")
        console.log("response from backend",response.data)
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteUrlApi = async (urlId) => {
    try {
        const response = await axiosInstance.delete(`/api/user/${urlId}`);
        console.log("Url deleted successfully", `${urlId}`);
        return response.data;
    } catch (error) {
        console.log("Error while deleting Url", error);
        throw error;
    }
}