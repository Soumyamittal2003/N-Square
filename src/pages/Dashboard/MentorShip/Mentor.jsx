import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { host, allGroupRoutes } from "./utils/APIRoutes";
import ChatContainer from "./components/ChatContainer";
import Contacts from "./components/Contacts";
import Welcome from "./components/Welcome";
import axiosInstance from "../../../utils/axiosinstance";

export default function Chat() {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(null);

  function handleMyGroup(data) {
    const userGroups = currentUser?.groups || [];
    const userGroupIds = userGroups.map((group) => group.groupId);
    const filteredData = data.filter((group) =>
      userGroupIds.includes(group._id)
    );

    return filteredData;
  }

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUserId = Cookies.get("id");
      if (currentUserId) {
        try {
          const user = await axiosInstance.get(`/users/${currentUserId}`);
          const userData = user.data.data;
          localStorage.setItem(
            "chat-app-current-user",
            JSON.stringify(userData)
          );
          setCurrentUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchCurrentUser();
  }, []);

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
    <div className="flex h-[650px] w-5/6">
      <div className="w-1/3 h-[600px] bg-gray-200 text-black p-4">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
      </div>
      <div className="flex-1 h-[600px] bg-gray-100 text-black p-4">
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </div>
  );
}
