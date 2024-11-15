// MainLayout.js
import StoryCard from "./StoryCard";
import VideoStory from "./VideoStory";

export default function InspiringStory() {
  return (
    <div className="flex">
      <main className="flex-1 p-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Trending Stories</h2>
          <a href="#" className="text-blue-500">
            View All
          </a>
        </div>
        <div className="flex space-x-4 overflow-x-auto">
          <StoryCard
            name="Soumya"
            description="Join our global network of seasoned forex traders for deep insights"
          />
          <StoryCard
            name="Soumya"
            description="Join our global network of seasoned forex traders for deep insights"
          />
          <StoryCard
            name="Soumya"
            description="Join our global network of seasoned forex traders for deep insights"
          />
          <StoryCard
            name="Soumya"
            description="Join our global network of seasoned forex traders for deep insights"
          />
        </div>

        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Short Inspiring Stories</h2>
            <a href="#" className="text-blue-500">
              View All
            </a>
          </div>
          <div className="flex space-x-4 overflow-x-auto">
            <VideoStory />
            <VideoStory />
            <VideoStory />
          </div>
        </div>

        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Trending Stories</h2>
            <a href="#" className="text-blue-500">
              View All
            </a>
          </div>
          <div className="flex space-x-4 overflow-x-auto">
            <VideoStory />
            <VideoStory />
          </div>
        </div>
      </main>
    </div>
  );
}
