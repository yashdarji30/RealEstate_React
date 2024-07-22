import noAvatar from "../../../public/noavatar.jpg";
import { useContext, useEffect, useRef, useState } from "react";
import { format } from "timeago.js";
import "./chatBox.scss";
import apiRequest from "../../lib/apiRequest";
import { SocketContext } from "../../context/SocketContext";
import { AuthContext } from "../../context/AuthContext";

const ChatBox = ({ setShowChatBox, chatData, receiver, currentChat }) => {
  console.log(chatData);
  const [chatMessages, setChatMessages] = useState([]);
  const messageEndRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { currentUser } = useContext(AuthContext);

  const chatReceiver = currentChat?.receiver || receiver;
  const chatId = currentChat ? currentChat.id : chatData.id;
  console.log(chatId, "chatId");
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await apiRequest().get(`/chats/${chatId}`);
        setChatMessages(res.data.messages || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchChat();
  }, [chatId]);

  useEffect(() => {
    socket.on("getMessage", (message) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("getMessage");
    };
  }, [socket, chatReceiver.id]);

  const sendMessage = async (text) => {
    try {
      const res = await apiRequest().post(`/messages/${chatId}`, { text });
      setChatMessages((prevMessages) => [...prevMessages, res.data]);
      socket.emit("sendMessage", {
        receiverId: chatReceiver.id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");
    if (!text) return;

    await sendMessage(text);
    e.target.reset();
  };

  return (
    <div className="chatBox">
      <div className="top">
        <div className="user">
          <img
            src={chatReceiver.avatar || noAvatar}
            alt={chatReceiver.username}
          />
          <div>
            <span>{chatReceiver.username}</span>
          </div>
        </div>
        <span className="close" onClick={() => setShowChatBox(false)}>
          X
        </span>
      </div>
      <div className="center">
        {chatMessages.map((message) => (
          <div
            className={`chatMessage ${
              message.userId === currentUser.id ? "right" : "left"
            }`}
            key={message.id}
          >
            <p>{message.text}</p>
            <span>{format(message.createdAt)}</span>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>
      <form onSubmit={handleFormSubmit} className="bottom">
        <textarea name="text"></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;