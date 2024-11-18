// ProfileSection.jsx
// this is the profile section of the sidebar

const ProfileSection = ({ userData }) => {
  return (
    <div className="relative">
      <img
        alt="University background"
        className="w-full h-52 object-fill"
        src={userData.backgroundimageUrl}
      />
      <div className="absolute inset-x-0 top-4 flex justify-center">
        <div className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-800 shadow-md">
          {userData.organization || "No Organization"}
        </div>
      </div>
      <div className="absolute inset-x-0 top-14 flex justify-center">
        <img
          alt={`Profile of ${userData.firstName} ${userData.lastName}`}
          className="w-20 h-20 rounded-full border-4 border-white"
          src={userData.profileimageUrl}
        />
      </div>
      <div className="absolute insert-x-0 top-32 w-full justify-center text-white text-center mt-2">
        <div>
          <h2 className="text-lg font-semibold">
            {userData.firstName} {userData.lastName}
          </h2>
          <p className="text-sm ">{userData.tagLine || "@2022 Btech-CSE"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
