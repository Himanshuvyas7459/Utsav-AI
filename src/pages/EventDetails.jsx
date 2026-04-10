import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  IndianRupee,
} from "lucide-react";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { getEventById } from "../features/events/eventSlice";
import API from "../utils/axios";
import { toast } from "react-toastify";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  const { event, isLoading, isError, message } = useSelector(
    (state) => state.event
  );

  useEffect(() => {
    if (id) {
      dispatch(getEventById(id));
    }
  }, [dispatch, id]);

  const isJoined =
    event && user
      ? event.attendees?.some(
          (attendeeId) => attendeeId.toString() === user._id
        )
      : false;

  const handleJoin = async () => {
    try {
      await API.post("/bookings/book", {
        eventId: event._id,
      });
      
      setTimeout(() => {
        navigate(`/booking/${event._id}`);
      }, 500);
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("Error joining event");
    }
  };
  
  //   // console.log("USER:", localStorage.getItem("user"));
  //   // console.log("TOKEN:", localStorage.getItem("token"));
  
  if (isLoading) return <Loader />;

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
          <Button onClick={() => navigate("/events")}>
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* IMAGE */}
      <div className="relative h-96 bg-gray-900">
        <img
          src={
            event.image ||
            "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg"
          }
          alt={event.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-32 relative z-10 pb-12">
        <div className="bg-white rounded-xl shadow-xl p-8">
          {/* HEADER */}
          <h1 className="text-4xl font-bold mb-4">
            {event.title || "Untitled Event"}
          </h1>

          {/* DETAILS */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">

            <div className="space-y-4">
              {event.date && (
                <div className="flex items-center gap-3">
                  <Calendar className="text-red-500" />
                  <span>
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
              )}

              {event.time && (
                <div className="flex items-center gap-3">
                  <Clock className="text-red-500" />
                  <span>{event.time}</span>
                </div>
              )}

              {event.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="text-red-500" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <IndianRupee className="text-red-500" />
                <span className="text-xl font-bold text-red-500">
                  {event.price ? `₹${event.price}` : "Free"}
                </span>
              </div>

              {event.capacity && (
                <div className="flex items-center gap-3">
                  <Users className="text-red-500" />
                  <span>{event.capacity} attendees</span>
                </div>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          {event.description && (
            <div className="border-t pt-6 mb-6">
              <h2 className="text-xl font-bold mb-2">About Event</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {event.description}
              </p>
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex gap-4">
            {user?.role === "attendee" &&
              (isJoined ? (
                <Button disabled className="bg-gray-400">
                  Joined
                </Button>
              ) : (
                <Button onClick={handleJoin} className="bg-green-500">
                  Join Event
                </Button>
              ))}

            {user?.role === "organizer" && (
              <Button onClick={() => navigate("/events/create")}>
                Create Event
              </Button>
            )}

            <Button variant="outline" onClick={() => navigate("/events")}>
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;