import { useEffect, useState } from "react";
// import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import API from "../utils/api";

const AdminAnalytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token");
          return;
        }

        const res = await API.get("/api/admin/analytics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(res.data);
      } catch (err) {
        console.log("Error:", err.response?.data || err.message);
      }
    };

    fetchAnalytics();
  }, []);

  if (!data) return <p className="p-6">Loading...</p>;

  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.role !== "admin") {
    return <p className="p-6 text-red-500">Access Denied</p>;
  }

  return (
    <div className="min-h-screen bg-[#fdf6ec] text-black p-6">
      <h1 className="text-3xl font-bold mb-8 text-red-600">
        Admin Analytics
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Users", value: data.totalUsers },
          { label: "Events", value: data.totalEvents },
          { label: "Bookings", value: data.totalBookings },
          { label: "Revenue", value: `₹${data.revenue}` },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 shadow-md border border-red-100 hover:shadow-lg transition"
          >
            <p className="text-gray-500 mb-2">{item.label}</p>
            <h2 className="text-2xl font-bold text-red-600">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* CHART */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-red-100">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Top Events (Bookings)
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.popularEvents}>
            <XAxis dataKey="_id" stroke="#555" />
            <YAxis stroke="#555" />
            <Tooltip />
            <Bar dataKey="totalBookings" fill="#dc2626" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminAnalytics;