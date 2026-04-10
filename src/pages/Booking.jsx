import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Minus, Plus, CreditCard } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getEventById } from "../features/events/eventSlice";
import Button from "../components/Button";
import Loader from "../components/Loader";
import API from "../utils/axios";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tickets, setTickets] = useState(1);
  const [processing, setProcessing] = useState(false);

  const user = React.useMemo(() => {
    return JSON.parse(localStorage.getItem("user"));
  }, []);

  const { event, isLoading } = useSelector((state) => state.event);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    if (id) {
      dispatch(getEventById(id));
    }
  }, [dispatch, id, navigate]);

  const handleTicketChange = (delta) => {
    const newValue = tickets + delta;
    if (newValue >= 1 && newValue <= 10) {
      setTickets(newValue);
    }
  };

  const handleBooking = async () => {
    try {
      setProcessing(true);

      if (!event?._id) {
        toast.error("Event not loaded");
        return;
      }

      const subtotal = event.price * tickets;
      const serviceFee = subtotal * 0.1;
      const total = subtotal + serviceFee;

      await API.post("/bookings/book", {
        eventId: event._id,
        tickets,
        totalAmount: total,
      });

      toast.success("Booking Successful");
      navigate("/events");
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking Failed");
    } finally {
      setProcessing(false);
    }
  };

  if (isLoading || !event) return <Loader />;

  const subtotal = event.price * tickets;
  const serviceFee = subtotal * 0.1;
  const total = subtotal + serviceFee;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4">Event Details</h2>

              <div className="flex gap-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.location}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4">Select Tickets</h2>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">General Admission</p>
                  <p className="text-sm text-gray-600">
                    ₹{event.price} per ticket
                  </p>
                </div>

                <div className="flex items-center gap-4">

                  <button
                    onClick={() => handleTicketChange(-1)}
                    disabled={tickets <= 1}
                    className="w-10 h-10 p-2 border rounded"
                  >
                    <Minus />
                  </button>

                  <span className="text-xl">{tickets}</span>

                  <button
                    onClick={() => handleTicketChange(1)}
                    disabled={tickets >= 10}
                    className="w-10 h-10 p-2 border rounded"
                  >
                    <Plus />
                  </button>

                </div>
              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div>
            <div className="bg-white p-6 rounded-xl shadow sticky top-20">

              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>₹{serviceFee.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-bold border-t pt-3">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

              </div>

              <Button
                onClick={handleBooking}
                disabled={processing}
                className="w-full flex items-center justify-center gap-2"
              >
                <CreditCard />
                {processing ? "Processing..." : "Book Now"}
              </Button>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Booking;