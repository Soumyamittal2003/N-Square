import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance"; // adjust path to your axios instance
import { toast } from "react-toastify"; // for notifications

const HomeContent = () => {
  const [activeTab, setActiveTab] = useState("posts"); // default to "posts"
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/post");
      setPosts(response.data); // Assuming response.data contains the post array
    } catch (error) {
      toast.error("Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/event/all");
      setEvents(response.data.events); // Assuming response.data.events contains the event array
    } catch (error) {
      toast.error("Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data based on the active tab
  useEffect(() => {
    if (activeTab === "posts") {
      fetchPosts();
    } else if (activeTab === "events") {
      fetchEvents();
    }
  }, [activeTab]);

  return (
    <div>
      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={activeTab === "posts" ? "active" : ""}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </button>
        <button
          className={activeTab === "events" ? "active" : ""}
          onClick={() => setActiveTab("events")}
        >
          Events
        </button>
      </div>

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "posts" && (
          <div className="posts-list">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="post-card">
                  <img src={post.postPhoto} alt="Post" />
                  <p>{post.description}</p>
                  {/* Add more post fields as needed */}
                </div>
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        )}

        {activeTab === "events" && (
          <div className="events-list">
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event._id} className="event-card">
                  <img src={event.eventphoto} alt="Event" />
                  <h3>{event.title}</h3>
                  <p>{event.eventDescription}</p>
                  {/* Add more event fields as needed */}
                </div>
              ))
            ) : (
              <p>No events available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeContent;
