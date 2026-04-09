import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  Users,
  IndianRupee,
} from "lucide-react";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { getEventById } from "../features/events/eventSlice";
// import axios from "axios";
import { toast } from "react-toastify";
import API from "../utils/api";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleJoin = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/api/bookings/book",
        { eventId: event._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setTimeout(() => {
        navigate(`/booking/${event._id}`);
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error("Error joining event");
    }
  };
  // console.log("USER:", localStorage.getItem("user"));
  // console.log("TOKEN:", localStorage.getItem("token"));

  const { event, isLoading, isError, message } = useSelector(
    (state) => state.event,
  );

  // console.log("EVENT:", event);

  let isJoined = false;

  if (event && user) {
    isJoined = event.attendees?.some(
      (attendeeId) => attendeeId.toString() === user._id,
    );
  }

  useEffect(() => {
    if (id) {
      dispatch(getEventById(id));
    }
  }, [dispatch, id]);

  if (isLoading) return <Loader />;
  console.log("EVENT DATA:", event);

  if (isError || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {message || "Event not found"}
          </h2>
          <p className="text-gray-600 mb-6">
            The event you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/events")}>Back to Events</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Event Image */}
      <div className="relative h-96 bg-gray-900">
        <img
          // src={event.image || 'https://via.placeholder.com/1200x500'}
          src={
            event.image ||
            "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1200"
          }
          alt={event.title || "Event"}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-32 relative z-10 pb-12">
        <div className="bg-white rounded-xl shadow-xl p-8">
          {/* Header */}
          <div className="mb-6">
            {event.category && (
              <span className="inline-block bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
                {event.category}
              </span>
            )}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {event.title || "Untitled Event"}
            </h1>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              {/* Date */}
              {event.date && (
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-red-500 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Date</p>
                    <p className="text-gray-600">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              )}

              {/* Time */}
              {event.time && (
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-red-500 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Time</p>
                    <p className="text-gray-600">{event.time}</p>
                  </div>
                </div>
              )}

              {/* Location */}
              {event.location && (
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-red-500 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {/* Price */}
              <div className="flex items-start">
                <IndianRupee className="w-5 h-5 text-red-500 mr-3 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Price</p>
                  <p className="text-2xl font-bold text-red-500">
                    {event.price != null
                      ? event.price === 0
                        ? "Free"
                        : `₹${event.price}`
                      : "Free"}
                  </p>
                </div>
              </div>

              {/* Capacity */}
              {event.capacity != null && (
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-red-500 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Capacity</p>
                    <p className="text-gray-600">
                      {(event.capacity ?? 0).toLocaleString()} attendees
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <div className="border-t pt-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About This Event
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {user?.role === "attendee" &&
              (isJoined ? (
                <Button
                  disabled
                  className="flex-1 bg-gray-400 cursor-not-allowed"
                >
                  Joined
                </Button>
              ) : (
                <Button onClick={handleJoin} className="flex-1 bg-green-500">
                  Join Event
                </Button>
              ))}

            {user?.role === "organizer" && (
              <Button
                onClick={() => navigate("/events/create")}
                className="flex-1"
              >
                Create More Events
              </Button>
            )}
            <Button
              onClick={() => navigate("/events")}
              variant="outline"
              className="flex-1"
            >
              Back to Events
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
