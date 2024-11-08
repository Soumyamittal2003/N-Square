import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default HomePage;
