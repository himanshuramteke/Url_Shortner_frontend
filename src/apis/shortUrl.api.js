import axiosInstance from "../utils/axiosInstance";

export const createShortUrlApi = async (url, slug) => {
    try {
        const {data} = await axiosInstance.post('/api/shortUrl', {url, slug})
        console.log("response in api", url, slug)
        return data.shortUrl;
    } catch (error) {
       console.log(error);
       throw error;
    }
}