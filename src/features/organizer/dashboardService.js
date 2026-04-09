import axios from "axios"

export const getDashboardAPI = async () => {
  try {
    const token = localStorage.getItem("token")

    const { data } = await axios.get(
      "https://utsav-ai.onrender.com/api/organizer/dashboard",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return data
  } catch (error) {
    console.log("DASHBOARD API ERROR:", error.response?.data || error.message)
    throw error
  }
}