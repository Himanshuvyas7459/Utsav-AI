import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBookings } from "../features/booking/bookingSlice";
import { Calendar, MapPin } from "lucide-react";
import { downloadTicket } from "../utils/ticketGenerator";

const MyBookings = () => {
  const dispatch = useDispatch();
  const { bookings, isLoading } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(getMyBookings());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        Loading bookings...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h1>

      {bookings?.length === 0 ? (
        <p className="text-gray-500">No bookings found</p>
      ) : (
        <div className="space-y-5">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white rounded-xl shadow-md border border-gray-200 flex overflow-hidden hover:shadow-lg transition"
            >
              {/* Red Strip */}
              <div className="w-2 bg-red-500"></div>

              {/* Content */}
              <div className="flex-1 p-5">
                <h2 className="text-xl font-semibold text-gray-800">
                  {b.event?.title || "Event Deleted"}
                </h2>

                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <MapPin size={14} className="mr-1" />
                  {b.event?.location || "Unknown Location"}
                </div>

                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <Calendar size={14} className="mr-1" />
                  {b.event?.date
                    ? new Date(b.event.date).toLocaleDateString()
                    : "Date not available"}
                </div>

                <p className="mt-2 text-gray-700 font-medium">
                  🎟 {b.tickets} Ticket(s)
                </p>

                <span className="inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-600">
                  {b.status || "Confirmed"}
                </span>

                {/* Download Button  */}
                {/* <div className=""> */}
                  <button
                  onClick={() => downloadTicket(b)}
                  className="mt-4 ml-240 cursor-pointer bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Download Ticket
                </button>
                {/* </div> */}
              </div>

              <div className="w-28">
                  <img
                  src={b.event?.image || "https://dummyimage.com/300x200/cccccc/000000"}
                  alt={b.event?.title || "event"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
