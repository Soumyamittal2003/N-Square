const UserCard = () => {
  return (
    <div className="flex gap-2 w-3/5 items-center justify-between mb-4 mx-auto p-2  rounded-lg ">
      <div className="flex items-center space-x-4">
        {/* Profile Picture */}
        <img
          src="https://via.placeholder.com/50"
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        {/* User Information */}
        <div>
          <p className="text-md font-semibold">Sumith Krishnan</p>
          <p className="text-sm text-gray-500">@Sumith K</p>
          <p className="text-sm text-gray-500">Ex-Data Analytics Consultant</p>
        </div>
      </div>
      {/* Unfollow Button */}
      <button className="self-start text-md font-semibold text-black border border-gray-300 rounded-lg mt-1 px-4 py-1 hover:bg-gray-100">
        Unfollow
      </button>
    </div>
  );
};

export default UserCard;
