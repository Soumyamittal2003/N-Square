import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import ChatContainer from "./ChatComponent/ChatContainer";
import Contacts from "./ChatComponent/Contacts";
import Welcome from "./ChatComponent/Welcome";
import axiosInstance from "../../../utils/axiosinstance";

export default function Chat() {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const tempUser = localStorage.getItem("chat-app-current-user");
  const currentUser = JSON.parse(tempUser);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("https://network-next-backend.onrender.com");
      socket.current.emit("/add-user", currentUser._id);
    }
    console.log();
  }, [currentUser]);

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

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-900">
      <div className="h-[85vh] w-[85vw] bg-gray-800 grid grid-cols-1 md:grid-cols-[25%_75%] gap-4">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </div>
  );
}
