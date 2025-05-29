import axiosInstance from "../utils/axiosInstance";

export const createShortUrlApi = async (url, slug) => {
    try {
        const {data} = await axiosInstance.post('/api/v1/create', {url, slug})
        return data.shortUrl;
    } catch (error) {
       console.log(error);
       throw error;
    }
}