import React from 'react'
import classes from "./PlayroomsPage.module.css";
import useChat from "../components/chat/useChat";

export const Game21 = (props) => {
    const { roomId } = props.match.params;
    const { messages, sendMessage } = useChat(roomId);
    const [newMessage, setNewMessage] = React.useState("");

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage("");
    };
    return(
        <div>Hello world
            <div className={classes.chat}>
                {/*{!loading && <MainChat  playrooms={playrooms} name={name}/>}*/}
                <div className="chat-room-container">
                    <h1 className="room-name">Room: {roomId}</h1>
                    <div className="messages-container">
                        <ol className="messages-list">
                            {messages.map((message, i) => (
                                <li
                                    key={i}
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
            </div>
        </div>

    )
}