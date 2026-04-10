import { useEffect, useState } from "react";
import API from "../utils/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const OrganizerAnalytics = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await API.get("/events/analytics");
        setData(data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load analytics"
        );
      }
    };

    fetchAnalytics();
  }, []);

  if (error) {
    return (
      <div className="p-6 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6">
        <p>Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf6ec] text-black p-6">
      <h1 className="text-3xl font-bold mb-8 text-red-600">
        Organizer Analytics
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-2xl p-6 shadow-md border border-red-100">
          <p className="text-gray-500 mb-2">Total Events</p>
          <h2 className="text-2xl font-bold text-red-600">
            {data?.totalEvents || 0}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-red-100">
          <p className="text-gray-500 mb-2">Total Bookings</p>
          <h2 className="text-2xl font-bold text-red-600">
            {data?.totalBookings || 0}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-red-100">
          <p className="text-gray-500 mb-2">Revenue</p>
          <h2 className="text-2xl font-bold text-red-600">
            ₹{data?.revenue || 0}
          </h2>
        </div>
      </div>

      {/* CHART */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-red-100">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Bookings Per Event
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data?.bookingsPerEvent || []}>
            <XAxis dataKey="title" stroke="#555" />
            <YAxis stroke="#555" />
            <Tooltip />
            <Bar
              dataKey="bookings"
              fill="#dc2626"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrganizerAnalytics;










// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const OrganizerAnalytics = () => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           console.log("No token found");
//           return;
//         }

//         const res = await axios.get("/api/events/analytics", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setData(res.data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to load analytics");
//       }
//     };

//     fetchAnalytics();
//   }, []);

//   if (error) {
//     return <div className="p-6 text-red-600 font-semibold">{error}</div>;
//   }

//   if (!data) {
//     return (
//       <div className="p-6">
//         <p>Loading analytics...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#fdf6ec] text-black p-6">
//       <h1 className="text-3xl font-bold mb-8 text-red-600">
//         Organizer Analytics
//       </h1>

//       {/* STATS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <div className="bg-white rounded-2xl p-6 shadow-md border border-red-100 hover:shadow-lg transition">
//           <p className="text-gray-500 mb-2">Total Events</p>
//           <h2 className="text-2xl font-bold text-red-600">
//             {data?.totalEvents || 0}
//           </h2>
//         </div>

//         <div className="bg-white rounded-2xl p-6 shadow-md border border-red-100 hover:shadow-lg transition">
//           <p className="text-gray-500 mb-2">Total Bookings</p>
//           <h2 className="text-2xl font-bold text-red-600">
//             {data?.totalBookings || 0}
//           </h2>
//         </div>

//         <div className="bg-white rounded-2xl p-6 shadow-md border border-red-100 hover:shadow-lg transition">
//           <p className="text-gray-500 mb-2">Revenue</p>
//           <h2 className="text-2xl font-bold text-red-600">
//             ₹{data?.revenue || 0}
//           </h2>
//         </div>
//       </div>

//       {/* CHART */}
//       <div className="bg-white rounded-2xl p-6 shadow-md border border-red-100">
//         <h2 className="text-xl font-semibold mb-4 text-red-600">
//           Bookings Per Event
//         </h2>

//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={data?.bookingsPerEvent || []}>
//             <XAxis dataKey="title" stroke="#555" />
//             <YAxis stroke="#555" />
//             <Tooltip />
//             <Bar dataKey="bookings" fill="#dc2626" radius={[6, 6, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default OrganizerAnalytics;
