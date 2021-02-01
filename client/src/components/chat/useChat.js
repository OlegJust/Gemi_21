import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient();

    socketRef.current.on("NEW_CHAT_MESSAGE_EVENT", (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = ({message,name,roomId}) => {
    socketRef.current.emit("NEW_CHAT_MESSAGE_EVENT", {
      body: message,
      senderId: name,
      roomId
    });
  };

  return { messages, sendMessage };
};

export default useChat;
