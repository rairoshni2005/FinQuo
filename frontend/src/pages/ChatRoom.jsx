import { useParams } from 'react-router-dom';
import styles from '../App.module.css';
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { FaPaperPlane } from 'react-icons/fa'; // Importing send icon

function ChatRoom() {
    let [message, setMessage] = useState("");
    let [username, setUsername] = useState("");
    let [messages, setMessages] = useState([]);
    let socket = useRef(null);

    const params = useParams();

    useEffect(() => {
        socket.current = io("http://localhost:8080");

        socket.current.emit("joinRoom", { roomname: params.roomname, username: "Saurabh" });

        socket.current.on("roomJoined", (data) => {
            console.log(data);
        });

        // Listen for new messages and update state for messages
        socket.current.on("getChat", (data) => {
            setMessages((prevValue) => {
                return [...prevValue, data];
            });
        });

        return () => {
            socket.current.disconnect();
        };
    }, [params.roomname]);

    // Function to handle sending messages
    function sendChatMessage() {
        socket.current.emit("createChat", {
            roomname: params.roomname,
            username: username,
            message: message
        });
        setMessage(""); // Clear the message input
    }

    return (
        <div className={styles.chatroom}>
            <div className={styles.chatlogger}>
                {messages.map((msg, index) => {
                    return (
                        <div key={index} className={msg.username === username ? styles.sent : styles.received}>
                            <p className={styles.username}>{msg.username}</p>
                            <p>{msg.message}</p>
                        </div>
                    );
                })}
            </div>
            <div className={styles.createchat}>
                <input
                    type="text"
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Enter your name"
                    className={styles.usernameInput}
                />
                <input
                    type="text"
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Write your message"
                    className={styles.messageInput}
                />
                <button onClick={sendChatMessage} className={styles.sendButton}>
                    <FaPaperPlane size={20} />
                </button>
            </div>
        </div>
    );
}

export default ChatRoom;
