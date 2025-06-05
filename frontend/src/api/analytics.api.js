import axiosInstance from "../utils/axiosInstance";

export const getUrlAnalytics = async (timeRange = "week") => {
  try {
    // here time can be "week", "month", "year"
    const { data } = await axiosInstance.get(
      `/api/analytics/urls?timeRange=${timeRange}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching URL analytics:", error);
    throw error;
  }
};

export const getUrlDetails = async (shortId) => {
  try {
    const { data } = await axiosInstance.get(`/api/analytics/url/${shortId}`);
    return data;
  } catch (error) {
    console.error("Error fetching URL details:", error);
    throw error;
  }
};
