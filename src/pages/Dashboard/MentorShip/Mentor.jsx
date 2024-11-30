import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host, allGroupRoutes } from "./utils/APIRoutes";
import ChatContainer from "./components/ChatContainer";
import Contacts from "./components/Contacts";
import Welcome from "./components/Welcome";
import axiosInstance from "../../../utils/axiosinstance";

export default function Mentor() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  function handleMyGroup(data) {
    // Parse the user groups from localStorage
    const user = JSON.parse(localStorage.getItem("chat-app-current-user"));
    const userGroups = user?.groups || [];

    // Extract only groupId from the user's groups
    const userGroupIds = userGroups.map((group) => group.groupId);

    // Filter the data to include only those groups for which the user is a member
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

  // Fixed useEffect for fetching groups asynchronously
  useEffect(() => {
    const fetchGroups = async () => {
      if (currentUser) {
        try {
          const { data } = await axiosInstance.get(`${allGroupRoutes}`);
          const filteredData = handleMyGroup(data.groups);
          console.log(filteredData);
          setContacts(filteredData);
        } catch (error) {
          console.error("Error fetching groups:", error);
        }
      }
    };

    fetchGroups(); // Call the async function
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
