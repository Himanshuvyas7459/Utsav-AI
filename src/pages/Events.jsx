import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "lucide-react";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";
import { getEvents } from "../features/events/eventSlice";

const Events = () => {
  const dispatch = useDispatch();
  const { events, isLoading, isError, message } = useSelector(
    (state) => state.event,
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const filteredEvents = Array.isArray(events)
    ? events.filter(
        (event) =>
          (event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location?.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (event._id || event.id),
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-16 px-4 flex">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 ml-11">
            Discover Events
          </h1>
          <p className="text-xl text-white-100 mb-8">
            Find and book tickets to amazing events near you
          </p>

          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg text-white-900 focus:ring-2 focus:ring-red-300 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <div className="text-center text-red-500">{message}</div>
        ) : filteredEvents.length > 0 ? (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredEvents.length}{" "}
                {filteredEvents.length === 1 ? "event" : "events"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event._id}
                  id={event._id}
                  title={event.title}
                  image={event.image || "/placeholder.jpg"}
                  location={event.location}
                  price={event.price}
                  date={event.date}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No events found
            </h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
