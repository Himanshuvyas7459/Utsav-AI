import API from "../../utils/api";

export const generatePlanAPI = async (formData) => {
  try {
    const { data } = await API.post("/ai/generate-plan", formData);
    return data;
  } catch (error) {
    console.log("API ERROR:", error.response?.data || error.message);
    throw error;
  }
};