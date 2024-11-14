import Sidebar from "./Common/Sidebar";
import Header from "./Common/Header";
import { useEffect } from "react";
import { Outlet, Routes, Route, Navigate } from "react-router-dom"; // Import Outlet and Route

import Home from "./Home/Home"; // Adjust the import path as necessary
import Event from "./Event/Event"; // Adjust the import path as necessary
import Job from "./Job/Job";
import Project from "./Project/Project";
import InspiringStory from "./InspiringStory/InspiringStory";
import Connection from "./Connection/Connection";

const Dashboard = () => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden"); // Disable body scrolling
  }, []);

  return (
    <>
      <Header />
      <div className="flex w-full h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="job" element={<Job />} />
            <Route path="event" element={<Event />} />
            <Route path="project" element={<Project />} />
            <Route path="inspiring-story" element={<InspiringStory />} />
            <Route path="connection" element={<Connection />} />
            {/* <Route path="post" element={<Post />} />
            <Route path="chat" element={<Events />} />
            <Route path="applied" element={<Events />} />
            <Route path="mentorship" element={<Events />} />
            <Route path="help" element={<Events />} /> */}
            {/* Add more routes here as needed */}
            <Route path="*" element={<div>Page Not Found</div>} />{" "}
            {/* Fallback for unmatched routes */}
          </Routes>
          <Outlet /> {/* This is where the nested routes will render */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
