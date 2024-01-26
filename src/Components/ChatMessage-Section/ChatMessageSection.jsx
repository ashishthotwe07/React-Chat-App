import React from "react";
import "./ChatMessageSection.css";
import { useSelector } from "react-redux";
import { selectChatSelector } from "../../Redux/Reducers/conversationSlice";
import { Link } from "react-router-dom";

function ChatMessageSection() {
  const user = useSelector(selectChatSelector);
  console.log("userfrom ", user);

  // Check if user exists and contains any data
  const isEmptyUser = Object.keys(user).length === 0;

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
            {/* Example: Left-aligned user message */}
            <div className="message user-message">
              <p className="message-content">{user.messages[0]}</p>
            </div>

            {/* Example: Right-aligned owner message */}
            <div className="message owner-message">
              <p className="message-content">
                Hi there! I'm doing well. Thanks!
              </p>
            </div>

            {/* Add more messages as needed */}
          </div>

          {/* Message Input Section */}
          <div className="message-input-section">
            <input
              type="text"
              className="message-input"
              placeholder="Type your message..."
            />
            <button className="send-button">Send</button>
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
