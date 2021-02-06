import React from 'react'
// {useCallback, useContext, useEffect, useState}
// import {useHttp} from "../hooks/http.hook";
// import {AuthContext} from "../context/AuthContext";
// import {Loader} from "../components/Loader";
import classes from "./PlayroomsPage.module.css";
// import MainChat from "../components/chat/MainChat";
import useChat from "../components/chat/useChat";

export const Game21 = (props) => {
    const { roomId } = props.match.params;
    const { messages, sendMessage } = useChat(roomId);
    // const {loading, request} = useHttp()
    // const [playrooms, setPlayrooms] = useState([])
    // const {token, name} = useContext(AuthContext)
    const [newMessage, setNewMessage] = React.useState("");

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage("");
    };

    // const fetchLinks = useCallback(async () => {
    //     try {
    //         const fetched = await request(
    //             '/api/game21/',
    //             'POST',
    //             {name:name},
    //             {Authorization: `Bearer ${token}`}
    //             )
    //         setPlayrooms(fetched)
    //     } catch (e) {
    //     }
    // }, [token, request, name])
    // useEffect(() => {
    //     fetchLinks()
    // }, [fetchLinks])
    // console.log(playrooms)
    // if (loading) {
    //     return <Loader/>
    // }
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
            </div>
        </div>

    )
}