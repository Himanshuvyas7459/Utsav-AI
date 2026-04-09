import axios from "axios"

export const generatePlanAPI = async (formData) => {
  try {
    const token = localStorage.getItem("token") // GET TOKEN

    const { data } = await axios.post(
      "https://utsav-ai.onrender.com/api/ai/generate-plan",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`  // VERY IMPORTANT
        }
      }
    )

    return data
  } catch (error) {
    console.log("API ERROR:", error)
    throw error
  }
}