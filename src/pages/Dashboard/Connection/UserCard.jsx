const UserCard = ({ user, isFollowing, onFollow, onUnfollow }) => {
  return (
    <div className="flex gap-2 w-3/5 items-center justify-between mb-4 mx-auto p-2 rounded-lg">
      <div className="flex items-center space-x-4">
        <img
          src={user.profileimageUrl}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="text-md font-semibold">{`${user.firstName} ${user.lastName}`}</p>
          <p className="text-sm text-gray-500">{user.tagLine}</p>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>
      </div>
      <button
        onClick={isFollowing ? onUnfollow : onFollow}
        className="self-start text-md font-semibold text-black border border-gray-300 rounded-lg mt-1 px-4 py-1 hover:bg-gray-100"
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default UserCard;
