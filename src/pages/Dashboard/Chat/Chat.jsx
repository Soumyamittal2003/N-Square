import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import ChatContainer from "./ChatComponent/ChatContainer";
import Contacts from "./ChatComponent/Contacts";
import Welcome from "./ChatComponent/Welcome";
import axiosInstance from "../../../utils/axiosinstance";

export default function Chat() {
  // WebSocket reference
  const socket = useRef(null);

  // State for contacts and current chat
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);

  // Fetch the current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("chat-app-current-user"));

  // Establish WebSocket connection
  useEffect(() => {
    if (currentUser && !socket.current) {
      socket.current = io("https://network-next-backend.onrender.com", {
        transports: ["websocket"], // Use WebSocket transport only
        reconnectionAttempts: 5, // Limit reconnections
        reconnectionDelay: 5000, // Delay between reconnections
      });

      // Emit user ID after connecting
      socket.current.once("connect", () => {
        console.log("WebSocket connected.");
        socket.current.emit("add-user", currentUser._id);
      });

      // Handle WebSocket connection errors
      socket.current.on("connect_error", (err) => {
        console.error("WebSocket connection error:", err.message);
      });

      // Handle WebSocket disconnection
      socket.current.on("disconnect", (reason) => {
        console.warn("WebSocket disconnected:", reason);
      });
    }

    return () => {
      console.log("Cleaning up WebSocket...");
      if (socket.current) {
        console.log("Disconnecting WebSocket...");
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, [currentUser]);
  // Fetch all contacts from the server
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
    <div className="h-[650px] w-11/12 bg-white shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-[30%_70%] gap-4 p-4">
      {/* Contacts Section */}
      <Contacts
        contacts={contacts}
        changeChat={handleChatChange}
        currentUser={currentUser}
      />

      {/* Chat Container or Welcome Message */}
      {currentChat === undefined ? (
        <Welcome />
      ) : (
        <ChatContainer currentChat={currentChat} socket={socket} />
      )}
    </div>
  );
}
