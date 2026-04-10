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