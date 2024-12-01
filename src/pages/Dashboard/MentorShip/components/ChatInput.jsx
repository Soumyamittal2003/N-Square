import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="grid grid-cols-[5%_95%] items-center bg-gray-300 p-4 md:p-6">
      {/* Emoji Picker Button */}
      <div className="flex items-center justify-center text-white gap-4">
        <div className="relative">
          <BsEmojiSmileFill
            onClick={handleEmojiPickerhideShow}
            className="text-xl text-[#ffff00c8] cursor-pointer"
          />
          {showEmojiPicker && (
            <Picker
              onEmojiClick={handleEmojiClick}
              className="absolute top-[-350px] bg-[#080420] shadow-lg border-[#9a86f3]"
            >
              <div className="emoji-scroll-wrapper::-webkit-scrollbar bg-[#080420] w-[5px]">
                <div className="bg-[#9a86f3]"></div>
              </div>
            </Picker>
          )}
        </div>
      </div>

      {/* Message Input Form */}
      <form
        className="flex items-center gap-4 bg-[#ffffff34] p-4 rounded-2xl w-full"
        onSubmit={sendChat}
      >
        <input
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          className="w-full h-full bg-transparent text-white border-none pl-4 text-xl focus:outline-none"
        />
        <button
          type="submit"
          className="flex justify-center items-center bg-[#9a86f3] rounded-2xl py-2 px-6 md:px-4"
        >
          <IoMdSend className="text-2xl text-white" />
        </button>
      </form>
    </div>
  );
}
