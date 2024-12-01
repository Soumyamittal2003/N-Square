import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = JSON.parse(localStorage.getItem("chat-app-current-user"));
        if (data) {
          setCurrentUserName(`${data.firstName} ${data.lastName}`);
          setCurrentUserImage(data.profileimageUrl);
        }
      } catch (error) {
        console.error("Error reading user data from localStorage:", error);
      }
    };

    fetchUserData(); // Call the async function
  }, []);

  const changeCurrentChat = (index, contact) => {
    const user = JSON.parse(localStorage.getItem("chat-app-current-user"));
    console.log(contact.createdBy, user._id);
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && currentUserImage && (
        <div className="p-4 ">
          {/* Logo and App Name */}
          <div className="flex items-center mb-4">
            <img src={Logo} alt="logo" className="w-12 h-12" />
            <h3 className="text-2xl font-semibold ml-2">N-square</h3>
          </div>

          {/* Contacts List */}
          <div className="space-y-2 overflow-y-auto h-[calc(100vh-200px)] hide-scrollbar">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  onClick={() => changeCurrentChat(index, contact)}
                  className="flex items-center gap-4 p-2 hover:bg-gray-700 cursor-pointer rounded-lg"
                >
                  <img
                    src={`${contact.groupProfileImage}`}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <h3 className="text-lg text-white">{contact.name}</h3>
                </div>
              );
            })}
          </div>

          {/* Current User Info */}
          <div className="flex items-center gap-4 mt-4 p-2 bg-gray-700 rounded-lg">
            <img
              src={`${currentUserImage}`}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <h2 className="text-xl text-white">{currentUserName}</h2>
          </div>
        </div>
      )}
    </>
  );
}
