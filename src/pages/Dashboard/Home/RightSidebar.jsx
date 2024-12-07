import { useState, useEffect } from 'react';

const RightSidebar = () => {
  // State to store upcoming events
  const [events, setEvents] = useState([]);
  // State to store suggested profiles
  const [profiles, setProfiles] = useState([]);
  // State to store the user ID
  const [userId, setUserId] = useState(null);

  // Fetch the user ID from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error('No user ID found in localStorage');
    }
  }, []);

  // Fetch upcoming events
  useEffect(() => {
    fetch('/recommadation/upcoming-events')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  // Fetch suggested profiles if userId is available
  useEffect(() => {
    if (userId) {
      fetch(`/recommadation/suggested-users/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => setProfiles(data))
        .catch((error) => console.error('Error fetching profiles:', error));
    }
  }, [userId]);

  return (
    <div className="w-1/3 mt-4 bg-white px-4">
      {/* Upcoming Events Section */}
      <div className="border p-4 rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Upcoming Events</h3>
          <button className="text-black font-semibold text-sm hover:underline">
            Explore All
          </button>
        </div>

        {/* Event Cards */}
        <div className="grid gap-2 mt-2">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div
                key={index}
                className="grid grid-cols-[80px_1fr] gap-4 items-center p-1"
              >
                <img
                  src={event.imageUrl || 'https://via.placeholder.com/80'}
                  alt="Event Thumbnail"
                  className="rounded-md w-20 h-20 object-cover"
                />
                <div>
                  <p className="text-sm font-semibold line-clamp-2">
                    {event.title}
                  </p>
                  <div className="flex justify-between mt-3">
                    <button className="bg-blue-600 text-white font-semibold px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition">
                      Share
                    </button>
                    <button className="bg-blue-600 text-white font-semibold px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No events available.</p>
          )}
        </div>
      </div>

      {/* Suggested Profiles Section */}
      <div className="px-2 py-2 rounded-lg mt-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Suggested Profiles</h3>
          <button className="text-black font-semibold text-sm hover:underline">
            View All
          </button>
        </div>

        {/* Profile Cards */}
        <div className="grid gap-4 mt-2">
          {profiles.length > 0 ? (
            profiles.map((profile, index) => (
              <div
                key={index}
                className="grid grid-cols-[50px_1fr] gap-2 border shadow-sm items-center rounded-lg px-4 py-2"
              >
                <img
                  src={profile.avatarUrl || 'https://via.placeholder.com/50'}
                  alt="Profile"
                  className="rounded-full w-12 h-12 object-cover"
                />
                <div>
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-md">{profile.name}</h4>
                    <button className="text-black font-bold px-2 border border-black items-center justify-center rounded-full text-base hover:bg-black hover:text-white transition">
                      <span className="text-lg">+</span> Follow
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {profile.bio}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No profiles available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;


