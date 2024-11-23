import { useState } from "react";
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
    <div className="grid grid-cols-[5%_95%] items-center bg-gray-900 px-8 py-4 md:px-4 gap-4">
      {/* Emoji Picker */}
      <div className="relative flex items-center text-white">
        <BsEmojiSmileFill
          className="text-yellow-400 text-xl cursor-pointer"
          onClick={handleEmojiPickerhideShow}
        />
        {showEmojiPicker && (
          <div className="absolute top-[-22rem]">
            <Picker
              onEmojiClick={handleEmojiClick}
              pickerStyle={{
                backgroundColor: "#080420",
                borderColor: "#9a86f3",
                boxShadow: "0 5px 10px #9a86f3",
              }}
            />
          </div>
        )}
      </div>

      {/* Input Field */}
      <form
        className="flex items-center gap-4 w-full bg-gray-800 p-2 rounded-full"
        onSubmit={sendChat}
      >
        <input
          type="text"
          placeholder="Type your message here"
          className="flex-1 bg-transparent text-white text-lg focus:outline-none px-4"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button
          type="submit"
          className="flex items-center justify-center bg-purple-500 p-2 rounded-full text-white hover:bg-purple-600"
        >
          <IoMdSend className="text-2xl" />
        </button>
      </form>
    </div>
  );
}
