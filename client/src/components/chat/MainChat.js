// import React, {useContext, useState, useEffect} from 'react'
// import classes from './MainChat.module.css'
// import {AuthContext} from "../../context/AuthContext";
// import socket from "../../core/socket"
// import {Loader} from "../Loader";
//
// export const MainChat = ({room}) => {
//     const [messages, setMessages] = useState([])
//     const {name} = useContext(AuthContext)
//
//     const createMessage = event => {
//         if (event.key === "Enter") {
//             setMessages(messages => [...messages, {text: event.target.value, name: name}]);
//             socket.emit('add message', [{text: event.target.value, name: name}, room])
//         }
//     }
//     console.log(room)
//     useEffect(() => {
//         if (room !== null) {
//             socket.emit('add message', [{text: `${name} connection`, name: name}, room])
//             socket.on('gett message', (message) => {
//                 setMessages(message);
//             })
//         }
//
//     }, [])
//
//     console.log(messages)
//     if (room === null) {
//         return <Loader/>
//     }
//
//     return (
//         <div className={classes.pages}>
//             <div className={classes.chatArea}>
//                 <ul className={classes.messages}>
//                     {messages.map((room, i) => {
//                         return (
//                             <li key={i}>{`${room.name}: ${room.text}`}</li>
//                         )
//                     })}
//                 </ul>
//             </div>
//             <div>
//                 <input className={classes.inputMessage} onKeyPress={createMessage} placeholder="Type here..."/>
//             </div>
//         </div>
//     )
// }
import React from "react";

import "./MainChat.module.css";
import useChat from "./useChat";

const MainChat = ({playrooms, name}) => {
    const roomId = playrooms.nameRoom;
    const { messages, sendMessage } = useChat(roomId);
    const [newMessage, setNewMessage] = React.useState("");

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        sendMessage({message:newMessage, name, roomId:roomId});
        setNewMessage("");
    };

    return (
        <div className="chat-room-container">
            <h1 className="room-name">Room: {roomId}</h1>
            <div className="messages-container">
                <ol className="messages-list">
                    {messages.map((message, i) => (
                        <li
                            key={i}
                            className={`message-item ${
                                message.ownedByCurrentUser ? "my-message" : "received-message"
                            }`}
                        >
                            {message.body}
                        </li>
                    ))}
                </ol>
            </div>
            <textarea
                value={newMessage}
                onChange={handleNewMessageChange}
                placeholder="Write message..."
                className="new-message-input-field"
            />
            <button onClick={handleSendMessage} className="send-message-button">
                Send
            </button>
        </div>
    );
};

export default MainChat;
