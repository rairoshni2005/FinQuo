// SocketChat.jsx
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Connect to the Socket.IO server
  const socket = io("http://localhost:8000");

  useEffect(() => {
    // Listen for incoming messages
    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = () => {
    if (message.trim()) {
      // Emit the message to the server
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Socket.IO Chat</h1>
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          marginBottom: "10px",
          height: "200px",
          overflowY: "auto",
        }}
      >
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        style={{ padding: "10px", width: "80%" }}
      />
      <button onClick={sendMessage} style={{ padding: "10px", marginLeft: "5px" }}>
        Send
      </button>
    </div>
  );
};

export default SocketChat;
