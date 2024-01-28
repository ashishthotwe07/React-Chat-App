// ChatListSection.js

import React, { useState } from "react";
import "./ChatListSection.css";
import { Link } from "react-router-dom";
import {
  conversationSelector,
  selectChat,
  selectChatSelector,
  deleteConversation,
  ownerMessageSelector, // Add this action
} from "../../Redux/Reducers/conversationSlice"; // Import the new action
import { useDispatch, useSelector } from "react-redux";

function ChatListSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const conversationList = useSelector(conversationSelector);
  const selectedChat = useSelector(selectChatSelector);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };
  const messages = useSelector(ownerMessageSelector);

  const OpenChat = (index) => {
    dispatch(selectChat(index));
  };

  const handleDelete = (index) => {
    dispatch(deleteConversation(index));
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  // Filter conversation list based on search term
  const filteredConversationList = conversationList.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const conversationWithMessages = filteredConversationList.map(
    (conversation) => {
      const selectedUserMessages = messages.filter(
        (message) => message.user.name === conversation.name
      );
      return { ...conversation, selectedUserMessages };
    }
  );

  return (
    <div className="chat-list-container">
      <div className="chat-list-search">
        <input
          type="search"
          placeholder="Search Conversation.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="chat-list-Add-conversation-btn">
        <p className="conversation-title">Conversation</p>
        <button
          className="conversation-btn"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link to={"/contacts"}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/8162/8162980.png"
              alt=""
            />
          </Link>
        </button>
        {showTooltip && <div className="tooltip">Add Conversation</div>}
      </div>

      <div className="conversation-list">
        {/* Map over filteredConversationList array */}
        {filteredConversationList.map((conversation, index) => (
          <div
            className={`conversation-item ${
              selectedChat && selectedChat.name === conversation.name
                ? "selected"
                : ""
            }`}
            key={index}
            onClick={() => OpenChat(conversation.name)}
          >
            <div className="profile-picture">
              <img src={conversation.dp} alt="Profile" className="sender-dp" />
            </div>
            <div className="details">
              <div className="name-last-seen">
                <p className="sender-name">{conversation.name}</p>
                <p className="last-sent-time">8:30pm</p>
              </div>
              <div className="sender-message">
                {conversationWithMessages[index].selectedUserMessages.length >
                0 ? (
                  <p>
                    {
                      conversationWithMessages[
                        index
                      ].selectedUserMessages.slice(-1)[0].message
                    }
                  </p>
                ) : (
                  <p>{conversation.messages.slice(-1)[0]}</p>
                )}
              </div>
            </div>
            {/* Add delete button */}
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(index);
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/7844/7844035.png"
                alt=""
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatListSection;
