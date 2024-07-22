import { useContext, useState } from "react";
import "./chat.scss";
import noAvatar from "../../../public/noavatar.jpg";
import { AuthContext } from "../../context/AuthContext";
import ChatBox from "../ChatBox/ChatBox";

function Chat({ chats }) {
  const { currentUser } = useContext(AuthContext);

  // State to control the visibility of the ChatBox
  const [showChatBox, setShowChatBox] = useState(false);

  // State to store the currently selected chat
  const [currentChat, setCurrentChat] = useState(null);

  // Function to toggle the visibility of the ChatBox

  // Function to handle click on a chat item
  const handleChatClick = (chat) => {
    setCurrentChat(chat); // Set the current chat
    setShowChatBox(true); // Show the ChatBox
  };

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats.map((c) => (
          <div
            className="message"
            key={c.id}
            style={{
              backgroundColor:
                c.seenBy.includes(currentUser.id) || chats?.id === c.id
                  ? "white"
                  : "#fbdfa1",
            }}
            onClick={() => handleChatClick(c)} // Pass the chat object to handleChatClick
          >
            <img src={c.receiver.avatar || noAvatar} alt="" />
            <span>{c.receiver.username}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>
      {/* Conditionally render the ChatBox based on the showChatBox state */}
      {showChatBox && currentChat && (
        <ChatBox
          chat={currentChat} // Pass the currentChat object to ChatBox
          currentUser={currentUser}
          setShowChatBox={setShowChatBox}
          currentChat={currentChat}
        />
      )}
    </div>
  );
}

export default Chat;