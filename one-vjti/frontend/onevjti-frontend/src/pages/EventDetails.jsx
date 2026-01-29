import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd1r-ATmZzBnmUNsx5ugGULqx93H9tUddvhD6lX1C2Vk4XRpw/viewform";

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${eventId}`);
        setEvent(res.data.data);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/users/login");
        } else {
          setError("Failed to load event");
        }
      } finally {
        setLoading(false); // 🔥 THIS WAS MISSING
      }
    };

    fetchEvent();
  }, [eventId, navigate]);

  const handleRegister = async () => {
    try {
      await api.post(`/event-registrations/${eventId}`);
      window.location.href = GOOGLE_FORM_URL;
    } catch (err) {
      if (err.response?.status === 409) {
        alert("You have already registered for this event");
      } else if (err.response?.status === 401) {
        navigate("/users/login");
      } else {
        alert("Registration failed");
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (error || !event) {
    return (
      <div className="text-center mt-20 text-red-500">
        {error || "Event not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen px-8 py-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-600 mb-6">{event.description}</p>

      <button
        onClick={handleRegister}
        className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
      >
        Register
      </button>
    </div>
  );
};

export default EventDetails;
