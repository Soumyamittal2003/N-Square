import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  // Fetch messages from the server
  useEffect(() => {
    const fetchMessages = async () => {
      const data = localStorage.getItem("chat-app-current-user");
      if (!data) {
        console.error("No user data found in localStorage");
        return;
      }
      const parsedData = JSON.parse(data);

      try {
        const response = await fetch(
          "https://network-next-backend.onrender.com/api/network-next/v1/messages/getmsg",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: parsedData._id,
              to: currentChat?._id,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setMessages(result);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    if (currentChat) {
      setMessages([]); // Clear old messages when chat changes
      fetchMessages();
    }
  }, [currentChat]);

  // Handle sending a message
  const handleSendMsg = async (msg) => {
    const data = localStorage.getItem("chat-app-current-user");
    if (!data) {
      console.error("No user data found in localStorage");
      return;
    }
    const parsedData = JSON.parse(data);

    // Emit message via socket
    socket.current.emit("send-msg", {
      to: currentChat?._id,
      from: parsedData._id,
      msg,
    });

    // Make API call to send message
    try {
      const response = await fetch(
        "https://network-next-backend.onrender.com/api/network-next/v1/messages/addmsg",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: parsedData._id,
            to: currentChat?._id,
            message: msg,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update messages state
      setMessages((prev) => [...prev, { fromSelf: true, message: msg }]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Listen for incoming messages via WebSocket
  useEffect(() => {
    if (socket.current) {
      const handleReceiveMessage = (msg) => {
        console.log("Message received via socket:", msg);
        if (msg.from === currentChat?._id) {
          // Ensure it's from the current chat
          setArrivalMessage({ fromSelf: false, message: msg });
        }
      };

      socket.current.on("msg-recieve", handleReceiveMessage);

      return () => {
        socket.current.off("msg-recieve", handleReceiveMessage); // Cleanup listener
      };
    }
  }, [socket, currentChat]);

  // Add new messages to the chat
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
          <div className="h-12 w-12">
            <img
              src={currentChat?.avatar || "defaultAvatarUrl"}
              alt="avatar"
              className="h-full w-full rounded-full"
            />
          </div>
          <h3 className="text-white">{currentChat?.username}</h3>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex flex-col gap-4 p-4 overflow-auto bg-gray-900 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
        {messages.map((message, index) => (
          <div
            ref={index === messages.length - 1 ? scrollRef : null}
            key={uuidv4()}
            className={`flex ${message.fromSelf ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[40%] break-words p-4 rounded-lg text-white text-base ${
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
