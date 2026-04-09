import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import eventReducer from "../features/events/eventSlice";
import aiReducer from "../features/ai/aiSlice";
import dashboardReducer from "../features/organizer/dashboardSlice"
import bookingReducer from "../features/booking/bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    event: eventReducer,
    ai: aiReducer,
    dashboard: dashboardReducer,
    booking: bookingReducer
  },
});