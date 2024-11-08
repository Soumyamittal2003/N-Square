import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Feed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Redirect to home or login page after logout
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="p-8 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <p className="mb-4">Welcome to the protected Feed page!</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Feed;
