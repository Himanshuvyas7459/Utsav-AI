import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BarChart3 } from "lucide-react";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(res.data);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };

    fetchDashboard();
  }, []);

  if (!data)
    return (
      <div className="h-screen flex items-center justify-center bg-[#fdf6f0] text-gray-700">
        Loading...
      </div>
    );

  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.role !== "admin") {
    return (
      <div className="h-screen flex items-center justify-center bg-[#fdf6f0] text-red-500">
        Access Denied
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf6f0] text-gray-800 p-6">
  
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        
        <h1 className="text-3xl font-bold text-red-500">
          Admin Dashboard
        </h1>

        <button
          onClick={() => navigate("/admin/analytics")}
          className="mt-4 md:mt-0 text-white flex items-center gap-2 bg-red-500 hover:opacity-90 px-6 py-3 rounded-lg shadow-lg transition cursor-pointer"
        >
          <BarChart3 className="w-5 h-5" />
          View Analytics
        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Users" value={data.totalUsers} />
        <StatCard title="Events" value={data.totalEvents} />
        <StatCard title="Bookings" value={data.totalBookings} />
        <StatCard title="Revenue" value={`₹${data.revenue}`} />
      </div>

      {/* CONTENT */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* USERS */}
        <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 border-l-4 border-red-500 pl-2">
            Recent Users
          </h2>

          <div className="space-y-3">
            {data.recentUsers?.map((user) => (
              <div
                key={user._id}
                className="flex justify-between items-center p-3 rounded-lg hover:bg-red-50 transition"
              >
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                  User
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* EVENTS */}
        <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 border-l-4 border-red-500 pl-2">
            Recent Events
          </h2>

          <div className="space-y-3">
            {data.recentEvents?.map((event) => (
              <div
                key={event._id}
                className="flex justify-between items-center p-3 rounded-lg hover:bg-red-50 transition"
              >
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-xs bg-gray-900 text-white px-2 py-1 rounded-full">
                  Event
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

/* STAT CARD */
const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-md hover:shadow-lg transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2 text-red-500">{value}</h2>
    </div>
  );
};

export default AdminDashboard;