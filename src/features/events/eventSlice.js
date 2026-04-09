import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import eventService from "./eventService";

// CREATE EVENT
export const createEvent = createAsyncThunk(
  "EVENT/CREATE",
  async (eventData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await eventService.createEvent(eventData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error"
      );
    }
  }
);

export const getEvents = createAsyncThunk(
  "EVENT/GET",
  async (_, thunkAPI) => {
    try {
      return await eventService.getEvents();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error"
      );
    }
  }
  
);

export const getEventById = createAsyncThunk(
  "EVENT/GET_ONE",
  async (id, thunkAPI) => {
    try {
      return await eventService.getEventById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error"
      );
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: [],
    event: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      // CREATE
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // GET
      .addCase(getEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // GET ONE
.addCase(getEventById.pending, (state) => {
  state.isLoading = true;
})
.addCase(getEventById.fulfilled, (state, action) => {
  state.isLoading = false;
  state.event = action.payload;
})
.addCase(getEventById.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
});
  },
});

export default eventSlice.reducer;