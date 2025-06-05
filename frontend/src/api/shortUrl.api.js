import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async (full_url, slug) => {
  const { data } = await axiosInstance.post("/api/create", { full_url, slug });
  return data.shortUrl;
};
