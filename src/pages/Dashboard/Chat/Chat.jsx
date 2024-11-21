import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../../../utils/ApiRoutes";
import ChatContainer from "./ChatComponent/ChatContainer";
import Contacts from "./ChatComponent/Contacts";
import Welcome from "./ChatComponent/Welcome";
import axiosInstance from "../../../utils/axiosinstance";

export default function Chat() {
  const socket = useRef();
  const [activeTab, setActiveTab] = useState("Chats");
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const tabs = ["Chats", "Video Chat"];

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await JSON.parse(
        localStorage.getItem("chat-app-current-user")
      );
      setCurrentUser(user);
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);

      return () => {
        socket.current.disconnect(); // Cleanup socket on component unmount
      };
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        try {
          const { data } = await axiosInstance.get(`${allUsersRoute}`);
          setContacts(data);
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
  console.log(contacts);
  return (
    <Container>
      {/* Tabs Section */}
      <div className="flex border border-gray-300 justify-around bg-white rounded-2xl shadow-lg px-4 py-1 m-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm px-4 py-2 rounded-full font-semibold ${
              activeTab === tab ? "text-black font-bold" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === "Chats" && (
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      )}
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
