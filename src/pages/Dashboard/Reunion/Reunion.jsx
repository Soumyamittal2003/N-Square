
import ReunionContent from "./ReunionContent";
import RightSidebar from "./RightSideBar";

const Reunion = () => {
  return (
    <div className =" min-h-screen p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Reunion</h1>
        <div className="space-x-4">
          <button className="px-4 py-2 text-black border border-black rounded-full hover:bg-black hover:text-white">
            Create Reunion
          </button>
          <button className="px-4 py-2 text-black border border-black rounded-md hover:bg-black hover:text-white">
            Memories
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <ReunionContent />
        </div>
        {/* Right Sidebar */}
        <div>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Reunion;
