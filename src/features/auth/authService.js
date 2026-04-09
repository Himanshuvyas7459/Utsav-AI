import API from "../../utils/api";

// Register
const register = async (formData) => {
  try {
    const { data } = await API.post("/auth/register", formData);
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    console.log("REGISTER ERROR:", error.response?.data || error.message);
    throw error;
  }
};

// Login
const login = async (formData) => {
  try {
    const { data } = await API.post("/auth/login", formData);
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    console.log("LOGIN ERROR:", error.response?.data || error.message);
    throw error;
  }
};

export default { register, login };