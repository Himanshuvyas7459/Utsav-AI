import axios from "axios";

const API_URL = "/api/bookings/";

// Get My Bookings
const getMyBookings = async (token) => {
  const res = await axios.get(API_URL + "my-bookings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

const bookingService = {
  getMyBookings,
};

export default bookingService;