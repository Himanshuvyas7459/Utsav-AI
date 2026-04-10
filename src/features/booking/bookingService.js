import API from "../../utils/axios";

// Get My Bookings
const getMyBookings = async () => {
  try {
    const { data } = await API.get("/bookings/my-bookings");
    return data;
  } catch (error) {
    console.log("BOOKING API ERROR:", error.response?.data || error.message);
    throw error;
  }
};

const bookingService = {
  getMyBookings,
};

export default bookingService;





// import API from "../../utils/api";

// // Get My Bookings
// const getMyBookings = async () => {
//   try {
//     const res = await API.get("/bookings/my-bookings");
//     return res.data;
//   } catch (error) {
//     console.log("BOOKING API ERROR:", error.response?.data || error.message);
//     throw error;
//   }
// };

// const bookingService = {
//   getMyBookings,
// };

// export default bookingService;