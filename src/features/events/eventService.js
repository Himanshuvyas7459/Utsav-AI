import axios from "axios";

const API_URL = "/api/events";

// helper function
const getToken = () => {
  return localStorage.getItem("token");
};

// CREATE EVENT
const createEvent = async (eventData) => {
  const token = getToken();

  const response = await axios.post(`${API_URL}/create`, eventData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// GET ALL EVENTS
const getEvents = async () => {
  const token = getToken();

  const response = await axios.get(`${API_URL}/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.events;
};

// GET SINGLE EVENT
const getEventById = async (id) => {
  const token = getToken();

  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const eventService = {
  createEvent,
  getEvents,
  getEventById,
};

export default eventService;