import React, { useState } from "react";
import "./ChatMessageSection.css";
import { useSelector, useDispatch } from "react-redux";
import {
  conversationSelector,
  ownerMessageSelector,
  selectChatSelector,
  sendMessage,
} from "../../Redux/Reducers/conversationSlice";
import { Link } from "react-router-dom";

function ChatMessageSection() {
  const dispatch = useDispatch();
  const user = useSelector(selectChatSelector);
  const [typedMessage, setTypedMessage] = useState("");
  const chatList = useSelector(conversationSelector); // Get the chat list
  const messages = useSelector(ownerMessageSelector);

  const selectedUserMessages = messages.filter(
    (message) => message.user.name === user?.name
  );

  const sendMessages = () => {
    if (typedMessage.trim() !== "") {
      dispatch(sendMessage(typedMessage));
      setTypedMessage(""); // Clear input after sending
    }
  };

  // Check if user exists and contains any data
  const isEmptyUser = !user || !user.name;

  // Check if the selected user exists in the chat list
  const isUserInChatList = !!chatList.find((chat) => chat.name === user?.name);

  return (
    <div className="chat-message-container">
      {isUserInChatList && !isEmptyUser ? (
        <>
          {/* Profile Section */}
          <div className="profile">
            <div className="user-dp">
              <img src={user.dp} alt="User Profile" className="user-dp-img" />
            </div>
            <div className="userinfo">
              <p className="user-name">{user.name}</p>
              <p className="user-no">{user.contactNo}</p>
            </div>
          </div>

          {/* Messages Section */}
          <div className="messages-section">
            {user.messages.map((message, index) => (
              <div key={index} className="userMessageContainer">
                <div className="user-image">
                  <img src={user.dp} alt="" />
                </div>

                <div key={index} className="message user-message">
                  <p className="message-content">{message}</p>
                </div>
              </div>
            ))}

            {/* Check if ownerMessages exists before mapping */}
            {selectedUserMessages.map((messageObj, index) => (
              <div key={index} className="ownerMessageContainer">
                <div key={index} className="message owner-message">
                  <p className="message-content">{messageObj.message}</p>
                </div>
                <div className="owner-image">
                  <img
                    src="https://images.unsplash.com/photo-1509933551745-514268e48884?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGluZGlhbiUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
                    alt=""
                  />
                </div>
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
