import axiosInstance from "../utils/axiosInstance";

export const createShortUrlApi = async (url) => {
    const {data} = await axiosInstance.post('/api/v1/create', {url})
    return data
}