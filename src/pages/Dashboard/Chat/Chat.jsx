import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import ChatContainer from "./ChatComponent/ChatContainer";
import Contacts from "./ChatComponent/Contacts";
import Welcome from "./ChatComponent/Welcome";
import axiosInstance from "../../../utils/axiosinstance";

export default function Chat() {
  // WebSocket reference
  const socket = useRef();

  // State for contacts and current chat
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);

  // Fetch the current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("chat-app-current-user"));

  // Establish WebSocket connection
  useEffect(() => {
    if (currentUser) {
      // Connect to WebSocket server
      socket.current = io("https://network-next-backend.onrender.com");

      // Notify server of the connected user
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  // Fetch all contacts
  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        try {
          const response = await axiosInstance.get("/users/get-all-users");
          setContacts(response.data);
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      }
    };
    fetchContacts();
  }, [currentUser]);

  // Handle switching between chats
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-900">
      <div className="h-[85vh] w-[85vw] bg-gray-800 grid grid-cols-1 md:grid-cols-[25%_75%] gap-4">
        {/* Contacts Section */}
        <Contacts contacts={contacts} changeChat={handleChatChange} />

        {/* Chat Container or Welcome Message */}
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </div>
  );
}
