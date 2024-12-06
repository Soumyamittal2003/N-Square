import React, { useState, useRef } from "react";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";

const VideoCall = () => {
  const appID = 661628401; // Replace with your Zego App ID
  const serverSecret = "9b99792e893708ef250012276bdef8ab"; // Replace with your Zego Server Secret
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const zegoClient = useRef(null);
  const [roomID, setRoomID] = useState("");

  const getUserId = () => {
    let userId = Cookies.get("id");
    if (!userId) {
      userId = `user_${Math.random().toString(36).substr(2, 9)}`;
      Cookies.set("user_id", userId);
    }
    return userId;
  };

  const generateToken = (userId) => {
    const expirationTime = Math.floor(Date.now() / 1000) + 3600; // 1-hour validity
    const payloadObject = {
      app_id: appID,
      user_id: userId,
      nonce: Math.floor(Math.random() * 1000000),
      exp: expirationTime,
    };

    const payloadString = JSON.stringify(payloadObject);
    const payloadBase64 = btoa(payloadString);
    const signature = CryptoJS.HmacSHA256(payloadBase64, serverSecret).toString();
    const token = `${payloadBase64}.${signature}`;
    return token;
  };

  const handleJoinRoom = async () => {
    const userId = getUserId();
    const token = generateToken(userId);
  
    // Initialize the Zego client
    zegoClient.current = new ZegoExpressEngine(appID, "wss://webrtc-api.zego.im/ws");
  
    console.log("Joining room:", roomID, "as user:", userId);
  
    // Login to the room
    zegoClient.current.loginRoom(
      roomID,
      token,
      { userID: userId, userName: userId }
    );
  
    // Add listeners for room events
    zegoClient.current.on("roomUserUpdate", (updateType, userList) => {
      console.log("Room user update:", updateType, userList);
    });
  
    zegoClient.current.on("roomStreamUpdate", (updateType, streamList) => {
      console.log("Room stream update:", updateType, streamList);
    });
  
    // Publish local stream
    const localStream = await zegoClient.current.createStream();
    localStreamRef.current.srcObject = localStream;
    localStreamRef.current.play();
    zegoClient.current.publishStream(localStream);
  
    // Listen for remote streams
    zegoClient.current.on("roomStreamUpdate", async (updateType, streamList) => {
      console.log("Stream list:", streamList);
      if (updateType === "ADD" && streamList.length > 0) {
        const remoteStream = await zegoClient.current.startPlayingStream(streamList[0].streamID);
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      }
    });
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-5">Zego WebRTC Video Call</h1>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomID}
        onChange={(e) => setRoomID(e.target.value)}
        className="mb-4 px-4 py-2 border rounded shadow-sm w-64"
      />
      <button
        onClick={handleJoinRoom}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Join Room
      </button>
      <div className="flex mt-8 space-x-4">
        <video ref={localStreamRef} autoPlay muted className="w-1/2 rounded border shadow" />
        <video ref={remoteStreamRef} autoPlay className="w-1/2 rounded border shadow" />
      </div>
    </div>
  );
};

export default VideoCall;
