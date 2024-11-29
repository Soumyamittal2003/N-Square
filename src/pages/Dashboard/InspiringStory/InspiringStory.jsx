import { useState } from "react";
import StoryCard from "./StoryCard";
import VideoStory from "./VideoStory";
import RightSidebar from "./RigntSideBar";

const InspiringStory = () => {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Funding Stories", "Impact Stories"];
  const trendingStories = [
    { id: 1, title: "Soumya", description: "Join our global network of seasoned forex traders for deep insights." },
    { id: 2, title: "Soumya", description: "Join our global network of seasoned forex traders for deep insights." },
    { id: 3, title: "Soumya", description: "Join our global network of seasoned forex traders for deep insights." },
  ];

  const videoStories = [
    { id: 1, videoSrc: "video1.mp4" },
    { id: 2, videoSrc: "video2.mp4" },
    { id: 3, videoSrc: "video3.mp4" },
  ];

  return (
    <div className="flex w-full ">
      {/* Main Content */}
      <div className="w-[70%] mx-8">
        {/* Tabs Section */}
        <div className="flex border border-gray-300 justify-around bg-white rounded-2xl shadow-lg px-4 py-1 m-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm px-4 py-2 rounded-full font-semibold ${
                activeTab === tab ? "text-black font-bold" : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Trending Stories */}
        <section className="my-8">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Stories</h2>
            <a href="#view-all" className="text-black font-semibold">
              View All
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {trendingStories.map((story) => (
              <StoryCard
                key={story.id}
                title={story.title}
                description={story.description}
              />
            ))}
          </div>
        </section>

        {/* Video Stories */}
        <section className="my-8">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Short Inspiring Stories</h2>
            <a href="#view-all" className="text-black font-semibold">
              View All
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
            {videoStories.map((video) => (
              <VideoStory key={video.id} videoSrc={video.videoSrc} />
            ))}
          </div>
        </section>
      </div>

      {/* Right Sidebar */}
      <div className="w-[30%] mx-6 ">
        <RightSidebar />
      </div>
    </div>
  );
};

export default InspiringStory;
