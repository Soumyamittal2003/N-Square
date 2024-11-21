import Sidebar from "./Common/Sidebar";
import Header from "./Common/Header";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import Event from "./Event/Event";
import Job from "./Job/Job";
import Project from "./Project/Project";
import InspiringStory from "./InspiringStory/InspiringStory";
import Connection from "./Connection/Connection";
import UserProfile from "./Common/UserProfile";
import Error404 from "../Error404";
import Followers from "./Connection/Followers";
import Following from "./Connection/Following";
import CreateJob from "./Job/RightSideBar";
//import PostPopup from "./Connection/Postpage";
import CreateProject from "./Project/CreateProject";
import AlmaResource from "./AlmaResource/AlmaResource";
import Chat from "./Chat/Chat";

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
            <Route path="profile" element={<UserProfile />} />
            <Route path="job" element={<Job />} />
            <Route path="event" element={<Event />} />
            <Route path="chat" element={<Chat />} />
            <Route path="project" element={<Project />} />
            <Route path="project/create-project" element={<CreateProject />} />
            <Route path="inspiring-story" element={<InspiringStory />} />
            <Route path="job/create-job" element={<CreateJob />} />
            <Route path="alumni-resources" element={<AlmaResource />} />
            <Route path="connection" element={<Connection />} />
            <Route path="followers" element={<Followers />} />
            <Route path="following" element={<Following />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
