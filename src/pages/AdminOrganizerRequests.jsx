import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrganizerRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await axios.get("/api/organizer/requests");
    setRequests(res.data);
  };

  const approve = async (id) => {
    await axios.put(`/api/organizer/approve/${id}`);
    fetchRequests();
  };

  const reject = async (id) => {
    await axios.put(`/api/organizer/reject/${id}`);
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Organizer Requests</h2>

      {requests.map((req) => (
        <div key={req._id} className="border p-4 mb-3 rounded">
          <p><b>Name:</b> {req.user.name}</p>
          <p><b>Email:</b> {req.user.email}</p>

          <button onClick={() => approve(req._id)}>
            Approve
          </button>

          <button onClick={() => reject(req._id)}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminOrganizerRequests;