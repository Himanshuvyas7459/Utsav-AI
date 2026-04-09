import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import {
  Calendar,
  Users,
  DollarSign,
  Plus,
  CreditCard as Edit,
  Trash2,
  BarChart3,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { fetchDashboardData } from "../features/organizer/dashboardSlice";
import { toast } from "react-toastify";
import API from "../utils/api";

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, stats, events } = useSelector((state) => state.dashboard);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "organizer") {
      navigate("/events");
    } else {
      dispatch(fetchDashboardData());
    }
  }, [dispatch, navigate]);

  if (loading) return <Loader />;

  const handleDelete = async (id) => {
    try {
      const token = user?.token;

      await API.delete(`/api/events/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(fetchDashboardData());
      toast.success("Event deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const handleEdit = (id) => {
    navigate(`/events/edit/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Organizer Dashboard</h1>
            <p className="text-red-100 text-lg">
              Manage your events and track performance
            </p>
          </div>

          {/* PERFECTLY PLACED BUTTON */}
          <button
            onClick={() => navigate("/organizer/analytics")}
            className="mt-4 md:mt-0 flex items-center gap-2 bg-red-500 to-pink-500 hover:opacity-90 px-6 py-3 rounded-lg shadow-lg transition cursor-pointer"
          >
            <BarChart3 className="w-5 h-5" />
            View Analytics
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-gray-600 text-sm">Total Events</p>
            <p className="text-3xl font-bold text-gray-900">
              {stats?.totalEvents || 0}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-gray-600 text-sm">Total Bookings</p>
            <p className="text-3xl font-bold text-gray-900">
              {stats?.totalBookings || 0}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-gray-600 text-sm">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900">
              ₹{stats?.revenue ? stats.revenue.toFixed(2) : "0.00"}
            </p>
          </div>
        </div>

        {/* EVENTS TABLE */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
              Your Events
            </h2>

            <Button
              onClick={() => navigate("/events/create")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              Create Event
            </Button>
          </div>

          {events?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Event</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Bookings</th>
                    <th className="text-left py-3 px-4">Revenue</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {events.map((event) => (
                    <tr key={event._id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4 font-semibold">{event.title}</td>

                      <td className="py-4 px-4 text-gray-600">
                        {new Date(event.date).toLocaleDateString()}
                      </td>

                      <td className="py-4 px-4 text-gray-600">
                        {event.bookings || 0}
                      </td>

                      <td className="py-4 px-4 text-gray-600">
                        ₹{event.revenue ? event.revenue.toFixed(2) : "0.00"}
                      </td>

                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                          Active
                        </span>
                      </td>

                      <td className="py-4 px-4 flex gap-2">
                        <button
                          onClick={() => handleEdit(event._id)}
                          className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                        >
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>

                        <button
                          onClick={() => handleDelete(event._id)}
                          className="p-2 hover:bg-red-50 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No events yet
              </h3>
              <p className="text-gray-500 mb-6">
                Create your first event to get started
              </p>
              <Button onClick={() => navigate("/events/create")}>
                Create Event
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
