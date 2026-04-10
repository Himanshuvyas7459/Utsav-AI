import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getDashboardAPI } from "./dashboardService"
import API from "../../utils/axios"

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getDashboardAPI()
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    stats: {},
    events: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false
        state.stats = action.payload.stats
        state.events = action.payload.events
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
       // DELETE
    .addCase(deleteEvent.fulfilled, (state, action) => {
      state.events = state.events.filter(
        (event) => event._id !== action.payload
      );
    })

    // UPDATE
    .addCase(updateEvent.fulfilled, (state, action) => {
      const index = state.events.findIndex(
        (e) => e._id === action.payload._id
      );
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    });
  }
})

export const deleteEvent = createAsyncThunk(
  "dashboard/deleteEvent",
  async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    await API.delete(`/api/events/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
// console.log(token);
    return id;
  }
);

export const updateEvent = createAsyncThunk(
  "dashboard/updateEvent",
  async ({ id, data }) => {
    const res = await API.put(`/api/events/update/${id}`, data);
    return res.data;
  }
);

export default dashboardSlice.reducer