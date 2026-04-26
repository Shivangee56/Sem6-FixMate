import { useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext";

const ChatBox = () => {

  const { messages, sendMessage } = useSocket();
  const { user } = useAuth();

  const [text, setText] = useState("");

  const handleSend = () => {

    if (!text.trim()) return;

    sendMessage({
      senderId: user._id,
      message: text
    });

    setText("");
  };

 return (
  <div style={{
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "380px",
    height: "500px",
    background: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif"
  }}>

    {/* Header */}
    <div style={{
      background: "#4F46E5",
      color: "white",
      padding: "15px",
      fontSize: "18px",
      fontWeight: "bold"
    }}>
      💬 Live Chat
    </div>

    {/* Messages */}
    <div style={{
      flex: 1,
      padding: "15px",
      overflowY: "auto",
      background: "#f9fafb"
    }}>
      {messages.map((msg, index) => {
        const isMe = msg.senderId === user._id;

        return (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: isMe ? "flex-end" : "flex-start",
              marginBottom: "10px"
            }}
          >
            <div style={{
              maxWidth: "70%",
              padding: "10px 14px",
              borderRadius: "18px",
              background: isMe ? "#4F46E5" : "#e5e7eb",
              color: isMe ? "white" : "black",
              fontSize: "14px"
            }}>
              {msg.message}
            </div>
          </div>
        );
      })}
    </div>

    {/* Input Area */}
    <div style={{
      display: "flex",
      padding: "10px",
      borderTop: "1px solid #e5e7eb",
      background: "white"
    }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        style={{
          flex: 1,
          padding: "10px",
          borderRadius: "20px",
          border: "1px solid #d1d5db",
          outline: "none",
          fontSize: "14px"
        }}
      />

      <button
        onClick={handleSend}
        style={{
          marginLeft: "8px",
          padding: "10px 16px",
          borderRadius: "20px",
          border: "none",
          background: "#4F46E5",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Send
      </button>
    </div>

  </div>
);
};

export default ChatBox;
