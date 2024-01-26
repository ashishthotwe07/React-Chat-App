import React, { useState } from "react";
import "./ChatMessageSection.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectChatSelector,
  sendMessage,
} from "../../Redux/Reducers/conversationSlice";
import { Link } from "react-router-dom";

function ChatMessageSection() {
  const dispatch = useDispatch();
  const user = useSelector(selectChatSelector);
  const [typedMessage, setTypedMessage] = useState("");

  const sendMessages = () => {
    if (typedMessage.trim() !== "") {
      dispatch(sendMessage(typedMessage));
      setTypedMessage(""); // Clear input after sending
    }
  };

  // Check if user exists and contains any data
  const isEmptyUser = !user;

  return (
    <div className="chat-message-container">
      {!isEmptyUser ? (
        <>
          {/* Profile Section */}
          <div className="profile">
            <div className="user-dp">
              <img
                src="https://cdn-icons-png.flaticon.com/128/5397/5397601.png"
                alt="User Profile"
                className="user-dp-img"
              />
            </div>
            <div className="userinfo">
              <p className="user-name">{user.name}</p>
              <p className="user-no">{user.contactNo}</p>
            </div>
          </div>

          {/* Messages Section */}
          <div className="messages-section">
            {user.messages.map((message, index) => (
              <div key={index} className="message user-message">
                <p className="message-content">{message}</p>
              </div>
            ))}

            {user.ownerMessages.map((message, index) => (
              <div key={index} className="message owner-message">
                <p className="message-content">{message}</p>
              </div>
            ))}
          </div>

          {/* Message Input Section */}
          <div className="message-input-section">
            <input
              type="text"
              className="message-input"
              placeholder="Type your message..."
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
            />
            <button className="send-button" onClick={sendMessages}>
              Send
            </button>
          </div>
        </>
      ) : (
        <div className="start-conversation-container">
          <Link to={"/contacts"}>
            <p className="start-conversation-message">Start a conversation</p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ChatMessageSection;
