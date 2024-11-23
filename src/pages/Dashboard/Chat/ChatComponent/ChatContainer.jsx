import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  // Fetch the current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("chat-app-current-user"));

  // Fetch chat messages for the current chat
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "https://network-next-backend.onrender.com/api/network-next/v1/messages/getmsg",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              from: currentUser._id,
              to: currentChat._id,
            }),
          }
        );

        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (currentChat) {
      fetchMessages();
    }
  }, [currentChat, currentUser]);

  // Send a message to the server
  const handleSendMsg = async (msg) => {
    socket.current.emit("send-msg", {
      from: currentUser._id,
      to: currentChat._id,
      msg,
    });

    try {
      await fetch(
        "https://network-next-backend.onrender.com/api/network-next/v1/messages/addmsg",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
          }),
        }
      );

      setMessages((prev) => [...prev, { fromSelf: true, message: msg }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Listen for incoming messages via WebSocket
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        if (msg.from === currentChat._id) {
          setArrivalMessage({ fromSelf: false, message: msg.msg });
        }
      });
    }
  }, [socket, currentChat]);

  // Update messages when a new message arrives
  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  // Scroll to the latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="grid grid-rows-[10%_80%_10%] gap-1 h-full overflow-hidden">
      {/* Chat Header */}
      <div className="flex justify-between items-center px-8 bg-gray-800">
        <div className="flex items-center gap-4">
          <img
            src={currentChat?.avatar || "defaultAvatarUrl"}
            alt="avatar"
            className="h-12 w-12 rounded-full"
          />
          <h3 className="text-white">{currentChat?.username}</h3>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex flex-col gap-4 p-4 overflow-auto bg-gray-900 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
        {messages.map((message, index) => (
          <div
            ref={index === messages.length - 1 ? scrollRef : null}
            key={uuidv4()}
            className={`flex ${
              message.fromSelf ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[40%] p-4 rounded-lg text-white ${
                message.fromSelf ? "bg-blue-500" : "bg-purple-500"
              }`}
            >
              {message.message}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}
