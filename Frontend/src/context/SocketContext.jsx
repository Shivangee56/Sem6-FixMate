import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {

  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const newSocket = io(
      import.meta.env.VITE_SOCKET_URL || "http://localhost:5000"
    );

    // Join Room
    newSocket.on("connect", () => {

      if (user.role === "worker" || user.type === "worker") {
        newSocket.emit("worker:join", user._id);
      } else {
        newSocket.emit("user:join", user._id);
      }

    });

    // Notification Listener
    newSocket.on("notification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    // Chat Listener
    newSocket.on("chat:receive", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    setSocket(newSocket);

    return () => newSocket.close();

  }, [user]);

  // Send Message
  const sendMessage = (chatData) => {
    if (!socket) return;

    socket.emit("chat:send", chatData);
    setMessages((prev) => [...prev, chatData]);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        notifications,
        messages,
        sendMessage
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
