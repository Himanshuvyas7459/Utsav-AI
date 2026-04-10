import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import API from "../utils/axios";
import { toast } from "react-toastify";

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, stats, events } = useSelector(
    (state) => state.dashboard
  );

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
      await API.delete(`/events/delete/${id}`);

      dispatch(fetchDashboardData());
      toast.success("Event deleted successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Delete failed"
      );
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
            <h1 className="text-4xl font-bold mb-2">
              Organizer Dashboard
            </h1>
            <p className="text-red-100 text-lg">
              Manage your events and track performance
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/organizer/analytics")
            }
            className="mt-4 md:mt-0 flex items-center gap-2 bg-red-500 hover:opacity-90 px-6 py-3 rounded-lg shadow-lg transition"
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
            <Calendar className="w-6 h-6 text-red-500 mb-2" />
            <p>Total Events</p>
            <h2 className="text-3xl font-bold">
              {stats?.totalEvents || 0}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <Users className="w-6 h-6 text-red-500 mb-2" />
            <p>Total Bookings</p>
            <h2 className="text-3xl font-bold">
              {stats?.totalBookings || 0}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <DollarSign className="w-6 h-6 text-red-500 mb-2" />
            <p>Total Revenue</p>
            <h2 className="text-3xl font-bold">
              ₹{stats?.revenue?.toFixed(2) || "0.00"}
            </h2>
          </div>

        </div>

        {/* EVENTS TABLE */}
        <div className="bg-white rounded-xl shadow-md p-6">

          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Your Events
            </h2>

            <Button
              onClick={() =>
                navigate("/events/create")
              }
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
                    <th className="text-left p-3">Event</th>
                    <th>Date</th>
                    <th>Bookings</th>
                    <th>Revenue</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {events.map((event) => (
                    <tr
                      key={event._id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-3 font-semibold">
                        {event.title}
                      </td>

                      <td>
                        {new Date(
                          event.date
                        ).toLocaleDateString()}
                      </td>

                      <td>{event.bookings || 0}</td>

                      <td>
                        ₹
                        {event.revenue?.toFixed(2) ||
                          "0.00"}
                      </td>

                      <td>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                          Active
                        </span>
                      </td>

                      <td className="flex gap-2">

                        <button
                          onClick={() =>
                            handleEdit(event._id)
                          }
                          className="p-2"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(event._id)
                          }
                          className="p-2"
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
            <p className="text-center py-10">
              No events yet
            </p>
          )}

        </div>

      </div>
    </div>
  );
};

export default OrganizerDashboard;