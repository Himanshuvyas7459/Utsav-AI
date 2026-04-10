import API from "../../utils/axios";

export const generatePlanAPI = async (formData) => {
  try {
    const { data } = await API.post("/ai/generate-plan", formData);
    return data;
  } catch (error) {
    console.log("API ERROR:", error.response?.data || error.message);
    throw error;
  }
};




// // import API from "../../utils/api";

// // export const generatePlanAPI = async (formData) => {
// //   try {
// //     const { data } = await API.post("/ai/generate-plan", formData);
// //     return data;
// //   } catch (error) {
// //     console.log("API ERROR:", error.response?.data || error.message);
// //     throw error;
// //   }
// // };





// // OLDER befgpt
// // import axios from "axios"

// // export const generatePlanAPI = async (formData) => {
// //   try {
// //     const token = localStorage.getItem("token") // GET TOKEN

// //     const { data } = await axios.post(
// //       "https://utsav-ai.onrender.com/api/ai/generate-plan",
// //       formData,
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`  // VERY IMPORTANT
// //         }
// //       }
// //     )

// //     return data
// //   } catch (error) {
// //     console.log("API ERROR:", error)
// //     throw error
// //   }
// // }





// //upper wale ka replacement 
// // import axios from "axios"

// // const API_URL = import.meta.env.VITE_API_URL

// // export const generatePlanAPI = async (formData) => {
// //   try {
// //     const token = localStorage.getItem("token")

// //     const { data } = await axios.post(
// //       `${API_URL}/ai/generate-plan`,
// //       formData,
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`
// //         }
// //       }
// //     )

// //     return data
// //   } catch (error) {
// //     console.log("API ERROR:", error)
// //     throw error
// //   }
// // }

// import axios from "axios"

// const API_URL = import.meta.env.VITE_API_URL

// export const generatePlanAPI = async (formData) => {
//   try {
//     const token = localStorage.getItem("token")

//     const { data } = await axios.post(
//       `${API_URL}/ai/generate-plan`,
//       formData,
//       {
//         headers: token
//           ? { Authorization: `Bearer ${token}` }
//           : {}
//       }
//     )

//     return data
//   } catch (error) {
//     console.log("API ERROR:", error)
//     throw error
//   }
// }