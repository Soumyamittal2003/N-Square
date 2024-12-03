import Sidebar from "./Common/Sidebar";
import Header from "./Common/Header";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import Event from "./Event/Event";
import Job from "./Job/Job";
import Help from "./Help/Help";
import Project from "./Project/Project";
import Mentor from "./MentorShip/Mentor";
import InspiringStory from "./InspiringStory/InspiringStory";
import Connection from "./Connection/Connection";
import MyEvent from "./MyEvent/MyEvent";
import UserProfile from "./Common/UserProfile";
import Error404 from "../Error404";
import Followers from "./Connection/Followers";
import Following from "./Connection/Following";
import CreateJob from "./Job/RightSideBar";
//import PostPopup from "./Connection/Postpage";
import CreateProject from "./Project/CreateProject";
import Memories from "./Reunion/Memories";
import AlmaResource from "./AlmaResource/AlmaResource";
import Volunteer from "./Volunteer/Volunteer";
import AboutEvent from "./Event/AboutEvent";
import AboutProject from "./Project/AboutProject";
import Reunion from "./Reunion/Reunion";
import AppliedJobs from "./AppliedJob/AppliedJob";
import Donation from "./Project/Donation";

import Chat from "./Chat/Chat";
import MentorContent from "./MentorShip/MentorContent";
import FindGroup from "./MentorShip/FindGroup";

const Dashboard = () => {
  useEffect(() => {
    // Disable scrolling on the body
    document.body.style.overflow = "hidden";

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="h-screen grid grid-rows-[auto_1fr]">
      {/* Header */}
      <Header />

      {/* Content Area */}
      <div className="grid grid-cols-[280px_1fr] h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="overflow-hidden">
          <Routes>
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="profile/:userId" element={<UserProfile />} />
            <Route path="job" element={<Job />} />
            <Route path="help" element={<Help />} />
            <Route path="event" element={<Event />} />
            <Route path="event/about-event" element={<AboutEvent />} />
            <Route path="my-events" element={<MyEvent />} />
            <Route path="chat" element={<Chat />} />
            <Route path="applied-jobs" element={<AppliedJobs />} />
            <Route path="project" element={<Project />} />
            <Route path="mentorship" element={<MentorContent />} />
            <Route path="mentorship/groups" element={<Mentor />} />
            <Route path="mentorship/find-group" element={<FindGroup />} />
            <Route path="project/:projectId" element={<AboutProject />} />
            {/* <Route path="project/:projectId/donation" element={<Donation />} /> */}
            <Route path="project/donate/:projectId" element={<Donation />} />
            <Route path="project/create-project" element={<CreateProject />} />
            <Route path="Reunion/Memories" element={<Memories />} />
            <Route path="inspiring-story" element={<InspiringStory />} />
            <Route path="job/create-job" element={<CreateJob />} />
            <Route path="alumni-resources" element={<AlmaResource />} />
            <Route path="volunteer" element={<Volunteer />} />
            <Route path="connection" element={<Connection />} />
            <Route path="followers" element={<Followers />} />
            <Route path="reunion" element={<Reunion />} />
            <Route path="following" element={<Following />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
