import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { host, allGroupRoutes } from "./utils/APIRoutes";
import ChatContainer from "./components/ChatContainer";
import Contacts from "./components/Contacts";
import Welcome from "./components/Welcome";
import axiosInstance from "../../../utils/axiosinstance";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const currentUser = JSON.parse(localStorage.getItem("chat-app-current-user"));

  function handleMyGroup(data) {
    const user = JSON.parse(localStorage.getItem("chat-app-current-user"));
    const userGroups = user?.groups || [];
    const userGroupIds = userGroups.map((group) => group.groupId);
    const filteredData = data.filter((group) =>
      userGroupIds.includes(group._id)
    );

    return filteredData;
  }

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchGroups = async () => {
      if (currentUser) {
        try {
          const data = await axiosInstance.get(`${allGroupRoutes}`);
          const filteredData = handleMyGroup(data.data.groups);
          console.log(filteredData);
          setContacts(filteredData);
        } catch (error) {
          console.error("Error fetching groups:", error);
        }
      }
    };

    fetchGroups();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-white">
        <div className="h-[85vh] w-[85vw] bg-white grid grid-cols-[25%,75%] md:grid-cols-[35%,65%]">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </div>
    </>
  );
}
