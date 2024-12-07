import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import axios from "axios";
import Cookies from "js-cookie";

const RoomPage = () => {
  const [roomId, setRoomId] = useState("");
  const userId = Cookies.get("id");
  const [userName, setUserName] = useState("User");
  const meetingRef = useRef(null);
  const navigate = useNavigate();
  let zc; // Zego Cloud instance

  // Fetch user data by ID
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(
          `https://n-square.onrender.com/api/network-next/v1/users/${userId}`
        );
        const userData = response.data?.data;
        if (userData) {
          setUserName(`${userData.firstName} ${userData.lastName}`);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserName();
  }, [userId]);

  // Function to initialize Zego Cloud meeting
  const joinMeeting = async () => {
    if (!roomId) {
      alert("Please enter a valid room ID.");
      return;
    }

    console.log("Initializing Zego Cloud meeting with room ID:", roomId);

    const appID = 661628401; // Replace with your Zego Cloud app ID
    const serverSecret = "9b99792e893708ef250012276bdef8ab"; // Replace with your Zego Cloud server secret

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      userId,
      userName
    );

    zc = ZegoUIKitPrebuilt.create(kitToken);

    zc.joinRoom({
      container: meetingRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      maxUsers: 2,
      turnOnCameraWhenJoining: true,
      turnOnMicrophoneWhenJoining: true,
      showUserJoinAndLeave: true,
      onLeaveRoom: () => {
        console.log("User has left the room.");
        zc.destroy();
        navigate("/"); // Redirect to the homepage or another page
      },
    });
  };

  useEffect(() => {
    return () => {
      if (zc) {
        console.log("Destroying Zego Cloud instance...");
        zc.destroy();
      }
    };
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome, {userName}</h2>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          style={styles.input}
        />
        <button onClick={joinMeeting} style={styles.joinButton}>
          Join Room
        </button>
      </div>
      <div ref={meetingRef} style={styles.videoContainer}></div>
    </div>
  );
};

// Styles for the application UI
const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E2F",
    padding: "20px",
    boxSizing: "border-box",
  },
  heading: {
    color: "#fff",
    marginBottom: "20px",
    fontSize: "24px",
    textAlign: "center",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "250px",
  },
  joinButton: {
    padding: "10px 20px",
    backgroundColor: "#28A745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
  videoContainer: {
    width: "100%",
    maxWidth: "900px",
    height: "60vh",
    backgroundColor: "#2B2B3D",
    borderRadius: "10px",
    overflow: "hidden",
    marginTop: "20px",
  },
};

export default RoomPage;
