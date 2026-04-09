import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingService from "./bookingService";

const initialState = {
  bookings: [],
  isLoading: false,
  isError: false,
  message: "",
};

export const getMyBookings = createAsyncThunk(
  "booking/getMyBookings",
  async (_, thunkAPI) => {
      try {
          const token = thunkAPI.getState().auth.token;
          // console.log("TOKEN:", token);
          // console.log("USER:", thunkAPI.getState().auth.user);
          return await bookingService.getMyBookings(token);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);
const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getMyBookings.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(getMyBookings.fulfilled, (state, action) => {
          // console.log("API RESPONSE:", action.payload);
        state.isLoading = false;
        state.bookings = action.payload.bookings;
      })
      .addCase(getMyBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default bookingSlice.reducer;