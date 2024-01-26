import React, { useState } from "react";
import "./ChatListSection.css";
import { Link } from "react-router-dom";
import {
  conversationSelector,
  selectChat,
} from "../../Redux/Reducers/conversationSlice";
import { useDispatch, useSelector } from "react-redux";

function ChatListSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const conversationList = useSelector(conversationSelector);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const OpenChat = (index) => {
    dispatch(selectChat(index));
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  // Filter conversation list based on search term
  const filteredConversationList = conversationList.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            className="conversation-item"
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
              {/* Assuming last message is stored in messages array */}
              <p className="sender-message">
                {conversation.messages.slice(-1)[0]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatListSection;
