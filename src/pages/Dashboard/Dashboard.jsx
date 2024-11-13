import Sidebar from "./Common/Sidebar";
import Header from "./Common/Header";
import { useEffect } from "react";
import { Outlet, Routes, Route } from "react-router-dom"; // Import Outlet and Route

import Home from "./Home/Home"; // Adjust the import path as necessary
import Events from "./Events/Events"; // Adjust the import path as necessary

const Dashboard = () => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden"); // Disable body scrolling

    return () => {
      document.body.classList.remove("overflow-hidden"); // Enable body scrolling when unmounted
    };
  }, []);

  return (
    <>
      <Header />
      <div className="flex w-full h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="events" element={<Events />} />
            {/* You can add more nested routes here */}
            <Route path="*" element={<div>Page Not Found</div>} />{" "}
            {/* Fallback route */}
          </Routes>
          <Outlet /> {/* This is where the nested routes will render */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
