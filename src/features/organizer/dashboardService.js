import API from "../../utils/api";

export const getDashboardAPI = async () => {
  try {
    const { data } = await API.get("/organizer/dashboard");
    return data;
  } catch (error) {
    console.log("DASHBOARD API ERROR:", error.response?.data || error.message);
    throw error;
  }
};