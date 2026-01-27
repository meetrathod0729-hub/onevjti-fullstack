import React from "react";
import { useNavigate } from "react-router-dom";

function EventCard({
  _id,
  title,
  description,
  registrationLink,
  location,
  eventType,
  startDate,
  endDate,
  poster,
}) {
  const navigate = useNavigate();
  if (!title) return null;

  // Helper to format dates (e.g., "Jan 20, 2026")
  const formatDate = (isoString) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      onClick={() => navigate(`/events/${_id}`)}
      className="bg-white p-4 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition"
    >
      {/* Poster */}
      <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
        <img
          src={poster || "https://placehold.co/600x400?text=Event+Poster"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>

        <span
          className={`text-xs px-3 py-1 rounded-full text-white
            ${
              eventType?.toLowerCase() === "technical"
                ? "bg-violet-600"
                : eventType?.toLowerCase() === "cultural"
                ? "bg-pink-500"
                : "bg-emerald-500"
            }
          `}
        >
          {eventType?.charAt(0).toUpperCase() + eventType?.slice(1)}
        </span>
      </div>

      {/* Description */}
      <p className="my-2 text-gray-600 text-lg">{description}</p>

      {/* Location & Dates */}
      <div className="flex justify-between text-lg text-black">
        <span>📍 {location}</span>
        <span>📅 {formatDate(startDate)}</span>
      </div>
      {/* Register Button */}
      <button
  onClick={(e) => {
    e.stopPropagation(); // 🔥 IMPORTANT
    navigate(`/events/${_id}`);
  }}
  className="inline-block mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg text-lg hover:bg-violet-700 transition"
>
  Register
</button>
    </div>
  );
}

export default EventCard;
