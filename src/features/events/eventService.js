import API from "../../utils/axios";

// CREATE EVENT
const createEvent = async (eventData) => {
  try {
    const { data } = await API.post("/events/create", eventData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.log("CREATE EVENT ERROR:", error.response?.data || error.message);
    throw error;
  }
};

// GET ALL EVENTS
const getEvents = async () => {
  try {
    const { data } = await API.get("/events/all");
    return data.events;
  } catch (error) {
    console.log("GET EVENTS ERROR:", error.response?.data || error.message);
    throw error;
  }
};

// GET SINGLE EVENT
const getEventById = async (id) => {
  try {
    const { data } = await API.get(`/events/${id}`);
    return data;
  } catch (error) {
    console.log("GET EVENT ERROR:", error.response?.data || error.message);
    throw error;
  }
};

const eventService = {
  createEvent,
  getEvents,
  getEventById,
};

export default eventService;









// import axios from "axios";

// const API_URL = "/api/events";

// // helper function
// const getToken = () => {
//   return localStorage.getItem("token");
// };

// // CREATE EVENT
// const createEvent = async (eventData) => {
//   const token = getToken();

//   const response = await axios.post(`${API_URL}/create`, eventData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return response.data;
// };

// // GET ALL EVENTS
// const getEvents = async () => {
//   const token = getToken();

//   const response = await axios.get(`${API_URL}/all`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.data.events;
// };

// // GET SINGLE EVENT
// const getEventById = async (id) => {
//   const token = getToken();

//   const response = await axios.get(`${API_URL}/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.data;
// };

// const eventService = {
//   createEvent,
//   getEvents,
//   getEventById,
// };

// export default eventService;



// import API from "../../utils/api";

// // CREATE EVENT
// const createEvent = async (eventData) => {
//   try {
//     const response = await API.post("/events/create", eventData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.log("CREATE EVENT ERROR:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // GET ALL EVENTS
// const getEvents = async () => {
//   try {
//     const response = await API.get("/events/all");
//     return response.data.events;
//   } catch (error) {
//     console.log("GET EVENTS ERROR:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // GET SINGLE EVENT
// const getEventById = async (id) => {
//   try {
//     const response = await API.get(`/events/${id}`);
//     return response.data;
//   } catch (error) {
//     console.log("GET EVENT ERROR:", error.response?.data || error.message);
//     throw error;
//   }
// };

// const eventService = {
//   createEvent,
//   getEvents,
//   getEventById,
// };

// export default eventService;