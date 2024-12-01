import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "../../../../utils/axiosinstance";
import {
  sendGroupMessageRoute,
  recieveGroupMessageRoute,
} from "../utils/APIRoutes";
import ChatInput from "./ChatInput";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const user = JSON.parse(localStorage.getItem("chat-app-current-user"));

  useEffect(() => {
    const fetchMessages = async () => {
      const data = JSON.parse(localStorage.getItem("chat-app-current-user"));
      const response = await axiosInstance.post(recieveGroupMessageRoute, {
        groupId: currentChat._id,
      });
      setMessages(response.data.messages);
      console.log(messages);
    };

    if (currentChat) {
      fetchMessages();
    }
  }, [currentChat, messages]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem("chat-app-current-user"))._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = JSON.parse(localStorage.getItem("chat-app-current-user"));
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });

    await axiosInstance.post(sendGroupMessageRoute, {
      sender: data._id,
      groupId: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-gray-800 rounded-lg p-4 h-full">
      {/* Chat Header */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={currentChat.groupProfileImage || "avatarImage"}
          alt="group-avatar"
          className="w-12 h-12 rounded-full"
        />
        <h3 className="text-xl text-white">{currentChat.name}</h3>
      </div>

      {/* Message List */}
      <div className="overflow-y-auto h-[calc(100vh-200px)] hide-scrollbar">
        {messages?.map((message) => {
          return (
            <div key={uuidv4()} className="mb-4 flex">
              <div
                className={`${
                  message.fromSelf ? "ml-auto bg-indigo-600" : "bg-gray-700"
                } p-3 rounded-xl max-w-[75%] text-white`}
              >
                <p>{message.message}</p>
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      {/* Message Input */}
      {(currentChat.hasOwnProperty("gender") ||
        currentChat.createdBy === user._id) && (
        <ChatInput handleSendMsg={handleSendMsg} />
      )}
    </div>
  );
}
