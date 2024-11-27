import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import CreateStory from "../InspiringStory/CreateStory";
import CreateJob from "../Job/CreateJob";
import CreateEvent from "../Event/CreateEvent";
import CreateResources from "../AlmaResource/CreateResource";
import CreateVolunteer from "../Volunteer/CreateVolunteer";
import CreatePost from "./CreatePost";

const PostPopup = ({ setPopupOpen }) => {
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showCreateResource, setShowCreateResource] = useState(false);
  const [showCreateVolunteer, setShowCreateVolunteer] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);

  const navigate = useNavigate();

  const handleStoryClick = () => setShowCreateStory(true);
  const handleJobClick = () => setShowCreateJob(true);
  const handleEventClick = () => setShowCreateEvent(true);
  const handleResourceClick = () => setShowCreateResource(true);
  const handleVolunteerClick = () => setShowCreateVolunteer(true);
  const handlePostClick = () => setShowCreatePost(true);

  const handleProjectClick = () => {
    setPopupOpen(false); // Close the popup
    navigate("/dashboard/project/create-project"); // Navigate to the project creation page
  };

  return (
    <>
      {!showCreateStory && !showCreateJob && !showCreateEvent && !showCreateResource && !showCreateVolunteer && !showCreatePost ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[500px] shadow-lg">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">What do you want to Post?</h2>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setPopupOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: "Post", visibility: "Anyone can view", onClick: handlePostClick },
                { label: "Project", visibility: "Followed People can view", onClick: handleProjectClick },
                { label: "Event", visibility: "Anyone can view", onClick: handleEventClick },
                { label: "Story", visibility: "Anyone can view", onClick: handleStoryClick },
                { label: "Job", visibility: "Anyone can view", onClick: handleJobClick },
                { label: "Volunteering", visibility: "Anyone can view", onClick: handleVolunteerClick },
                { label: "Alma Resources", visibility: "Anyone can view", onClick: handleResourceClick },
              ].map((item, index) =>
                <button
                  key={index}
                  onClick={item.onClick}
                  className="flex items-center justify-between w-full border px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-500">👤</span>
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <span className="text-xs text-gray-500">{item.visibility}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : showCreateStory ? (
        <CreateStory onClose={() => setShowCreateStory(false)} />
      ) : showCreateJob ? (
        <CreateJob onClose={() => setShowCreateJob(false)} />
      ) : showCreateEvent ? (
        <CreateEvent onClose={() => setShowCreateEvent(false)} />
      ) : showCreateResource ? (
        <CreateResources onClose={() => setShowCreateResource(false)} />
      ) : showCreateVolunteer ? (
        <CreateVolunteer onClose={() => setShowCreateVolunteer(false)} />
      ) : (
        <CreatePost onClose={() => setShowCreatePost(false)} />
      )}
    </>
  );
};

export default PostPopup;
