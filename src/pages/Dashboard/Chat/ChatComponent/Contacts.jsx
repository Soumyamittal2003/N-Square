import { useState, useEffect } from "react";
import Logo from "../../../../assets/chat/logo.svg";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = localStorage.getItem("chat-app-current-user");
      const parsedData = JSON.parse(data);
      setCurrentUserName(`${parsedData.firstName} ${parsedData.lastName}`);
      setCurrentUserImage(parsedData.profileimageUrl);
    };
    fetchUserData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && currentUserImage && (
        <div className="grid grid-rows-[10%_75%_15%] h-full bg-gray-900">
          {/* Brand Section */}
          <div className="flex items-center justify-center gap-4">
            <img src={Logo} alt="logo" className="h-8" />
            <h3 className="text-white uppercase">N-square</h3>
          </div>

          {/* Contacts Section */}
          <div className="flex flex-col items-center gap-2 overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`w-[90%] flex items-center gap-4 p-2 rounded-md cursor-pointer transition-all duration-300 ${
                  index === currentSelected ? "bg-purple-500" : "bg-gray-700"
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="flex-shrink-0">
                  <img
                    src={contact.profileimageUrl}
                    alt=""
                    className="h-12 w-12 rounded-full"
                  />
                </div>
                <div className="text-white">
                  <h3>
                    {contact.firstName} {contact.lastName}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Current User Section */}
          <div className="flex items-center justify-center gap-6 bg-gray-800">
            <div className="flex-shrink-0">
              <img
                src={currentUserImage}
                alt="avatar"
                className="h-16 w-16 rounded-full"
              />
            </div>
            <div className="text-white">
              <h2 className="text-lg">{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
