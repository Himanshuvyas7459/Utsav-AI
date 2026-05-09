import { useEffect, useState } from "react";
import API from "../utils/axios";

const AdminOrganizerRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await API.get("/organizer/requests");
    setRequests(res.data);
  };

  const approve = async (id) => {
    await API.put(`/organizer/approve/${id}`);
    fetchRequests();
  };

  const reject = async (id) => {
    await API.put(`/organizer/reject/${id}`);
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      
      {/* Heading */}
      <div className="max-w-5xl mx-auto mb-10 text-center">
        <h2 className="text-4xl font-bold text-gray-800">
          Organizer Requests
        </h2>
        <p className="text-gray-500 mt-2">
          Manage and approve organizer access
        </p>
      </div>

      {/* Requests List */}
      <div className="max-w-5xl mx-auto space-y-5">
        
        {requests.length === 0 && (
          <div className="text-center text-gray-500 text-lg">
            No pending requests 🚀
          </div>
        )}

        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* User Info */}
            <div className="mb-4 md:mb-0">
              <p className="text-lg font-semibold text-gray-800">
                {req.user?.name}
              </p>
              <p className="text-gray-500 text-sm">
                {req.user?.email}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => approve(req._id)}
                className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium shadow-sm hover:shadow-md transition duration-300"
              >
                Approve
              </button>

              <button
                onClick={() => reject(req._id)}
                className="px-5 py-2 rounded-lg border border-gray-300 hover:border-red-500 hover:text-red-500 text-gray-600 font-medium transition duration-300"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrganizerRequests;