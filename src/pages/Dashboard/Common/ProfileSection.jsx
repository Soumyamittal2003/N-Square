import { Link } from "react-router-dom";

const ProfileSection = ({ userData }) => {
  return (
    <div className="relative">
      {/* Background Image */}
      <div className="w-full h-56 bg-white">
        {userData.backgroundimageUrl && (
          <img
            alt="University background"
            className="w-full h-full object-cover -mt-16"
            src={userData.backgroundimageUrl}
          />
        )}
      </div>

      {/* Organization Badge */}
      <div className="absolute top-2  inset-x-0 flex justify-center">
        <span className="bg-white px-3 py-1  rounded-full text-xs font-semibold shadow-md">
          {userData.organization || "No Organization"}
        </span>
      </div>

      {/* User Info */}
      <div className="absolute top-10 inset-x-0 text-center">
        <img
          alt={`Profile of ${userData.firstName} ${userData.lastName}`}
          className="w-[100px] h-[100px] rounded-full border-4 border-white shadow-md mx-auto"
          src={userData.profileimageUrl}
        />
        <h2 className="text-lg font-semibold text-gray-800 mt-2">
          {userData.firstName} {userData.lastName}
        </h2>
        <p className="text-sm text-gray-500">{userData.tagLine || "BTech CSE"}</p>
      </div>

      {/* Followers and Following Section */}
      <div className="flex items-center justify-around mt-6 p-1 border border-gray-300 rounded-2xl shadow-sm mx-4">
        <Link to="/dashboard/followers" className="text-center">
          <div>
            <span className="block text-lg font-semibold text-gray-800">
              {userData.followers.length}
            </span>
            <span className="text-sm text-gray-500">Followers</span>
          </div>
        </Link>
        <div className="border-l border-gray-300 h-8"></div>
        <Link to="/dashboard/following" className="text-center">
          <div>
            <span className="block text-lg font-semibold text-gray-800">
              {userData.following.length}
            </span>
            <span className="text-sm text-gray-500">Following</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfileSection;
