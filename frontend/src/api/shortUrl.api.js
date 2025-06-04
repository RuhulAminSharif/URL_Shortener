import axiosInstance from "../utils/axiosInstance"

export const createShortUrl = async (longUrl,slug) =>{
    const {data} = await axiosInstance.post("/api/create",{longUrl,slug})
    return data.shortUrl
}
