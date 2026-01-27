// import { useEffect, useState } from "react";
// import EventCard from "../components/Events/EventCard";
// import CommitteeCard from '../components/CommitteeCard';
// import api from "../api/axios";

// const Home = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await api.get("/events");

//         // backend response format:
//         // { statusCode, data: [], message, success }
//         console.log("EVENT RESPONSE:", res.data);
//         setEvents(res.data.data || []);
//       } catch (err) {
//         setError("Failed to load Events");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500">
//         Loading Events...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-500">
//         {error}
//       </div>
//     );
//   }

//   if (events.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-400">
//         No events available
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen px-8 py-10">
//       <section>
//       <h1 className="text-3xl font-bold mb-8 text-center">
//         Upcoming Events
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {events.map((event) => (
//           <EventCard
//             key={event._id}
//             title={event.title}
//             description={event.description}
//             registrationLink={event.registrationLink}
//             location={event.location}
//             eventType={event.eventType}
//             startDate={event.startDate}
//             endDate={event.endDate}
//             poster={event.poster}
//           />
//         ))}
//       </div>
//         </section>
//         {/* Committees section */}
//         <section>
//         <h1 className="text-3xl font-bold mb-8 text-center">
//           Committees
//         </h1>

//         {committees.length === 0 ? (
//           <p className="text-center text-gray-400">
//             No committees available
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {committees.map((committee) => (
//               <CommitteeCard
//                 key={committee._id}
//                 committee={committee}
//               />
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Home;

import { useEffect, useState } from "react";
import EventCard from "../components/Events/EventCard";
import CommitteeCard from "../components/CommitteeCard";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
//import Notifications from "./Notifications";
const Home = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [committees, setCommittees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, committeesRes] = await Promise.all([
          api.get("/events"),
          api.get("/committees"),
        ]);

        setEvents(eventsRes.data.data || []);
        setCommittees(committeesRes.data.data || []);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen px-8 py-10 space-y-20">
      {/* MINIMAL UPDATE: SMART FEED (Only for logged in users)
      {user && (
        <section className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
          <h2 className="text-2xl font-bold mb-4 text-purple-900">Your Smart Feed</h2>
          <Notifications />
        </section>
      )} */}
      {/* EVENTS SECTION */}
      <section>
        <h1 className="text-3xl font-bold mb-8 text-center">
          Upcoming Events
        </h1>

        {events.length === 0 ? (
          <p className="text-center text-gray-400">
            No events available
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <EventCard
                key={event._id}
                _id={event._id}
                title={event.title}
                description={event.description}
                registrationLink={event.registrationLink}
                location={event.location}
                eventType={event.eventType}
                startDate={event.startDate}
                endDate={event.endDate}
                poster={event.poster}
              />
            ))}
          </div>
        )}
      </section>

      {/* COMMITTEES SECTION */}
      <section>
        <h1 className="text-3xl font-bold mb-8 text-center">
          Committees
        </h1>

        {committees.length === 0 ? (
          <p className="text-center text-gray-400">
            No committees available
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {committees.map((committee) => (
              <CommitteeCard
                key={committee._id}
                committee={committee}
              />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default Home;
