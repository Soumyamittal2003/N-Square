import { useState, useEffect } from "react";
import Robot from "../../../../assets/chat/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const user = await JSON.parse(
        localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)
      );
      setUserName(user?.username || "");
    };
    fetchUserName();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center text-white">
      <img src={Robot} alt="Robot" className="h-80" />
      <h1 className="text-2xl">
        Welcome, <span className="text-indigo-500">{userName}</span>!
      </h1>
      <h3 className="text-lg mt-4">Please select a chat to start messaging.</h3>
    </div>
  );
}
