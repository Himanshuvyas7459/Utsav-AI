import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import RoleRoute from "./components/RoleRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/AdminDashboard";
import Unauthorized from "./pages/Unauthorized";
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import Booking from "./pages/Booking";
import AIPlanner from "./pages/AIPlanner";
import EditEvent from "./pages/EditEvent";
import Profile from "./pages/Profile";
import OrganizerAnalytics from "./pages/OrganizerAnalytics";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAnalytics from "./pages/AdminAnalytics";
import MyBookings from "./pages/MyBookings";

const App = () => {
  return (
    <BrowserRouter>
      {/* <Router> */}
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/my-bookings" element={<MyBookings />} />

          <Route
            path="/organizer/analytics"
            element={
              <RoleRoute allowedRoles={["organizer"]}>
                <OrganizerAnalytics />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <RoleRoute allowedRoles={["admin"]}>
                <AdminAnalytics />
              </RoleRoute>
            }
          />
          {/* DASHBOARD */}
          <Route
            path="/organizer/dashboard"
            element={
              <RoleRoute allowedRoles={["organizer"]}>
                <OrganizerDashboard />
              </RoleRoute>
            }
          />
          {/* ADMIN DASHBOARD */}
          <Route
            path="/admin/dashboard"
            element={
              <RoleRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </RoleRoute>
            }
          />
          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <RoleRoute allowedRoles={["admin"]}>
                <Admin />
              </RoleRoute>
            }
          />

          <Route
            path="/events/create"
            element={
              <RoleRoute allowedRoles={["organizer"]}>
                <CreateEvent />
              </RoleRoute>
            }
          />

          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            }
          />

          <Route
            path="/events/:id"
            element={
              <ProtectedRoute>
                <EventDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/booking/:id"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ai-planner"
            element={
              <RoleRoute allowedRoles={["organizer"]}>
                <AIPlanner />
              </RoleRoute>
            }
          />

          <Route path="/events/edit/:id" element={<EditEvent />} />

          {/* ERROR */}
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
        <ToastContainer />
      </div>
      {/* </Router>  */}
    </BrowserRouter>
  );
};

export default App;
