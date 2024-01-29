// Importing necessary libraries and components
import React, { useState } from "react";
import "./ChatListSection.css";
import { Link } from "react-router-dom";
import {
  conversationSelector,
  selectChat,
  selectChatSelector,
  deleteConversation,
  ownerMessageSelector, // New action imported
} from "../../Redux/Reducers/conversationSlice"; // Importing conversation slice from Redux
import { useDispatch, useSelector } from "react-redux";

// Functional component for rendering the chat list section
function ChatListSection() {
  // State variables
  const [searchTerm, setSearchTerm] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  // Redux state and dispatch
  const conversationList = useSelector(conversationSelector);
  const selectedChat = useSelector(selectChatSelector);
  const messages = useSelector(ownerMessageSelector);
  const dispatch = useDispatch();

  // Handler for showing tooltip on mouse enter
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  // Handler for hiding tooltip on mouse leave
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  // Function to open a chat when clicked
  const OpenChat = (index) => {
    dispatch(selectChat(index));
  };

  // Function to delete a conversation
  const handleDelete = (index) => {
    dispatch(deleteConversation(index));
  };

  // Filter conversation list based on search term
  const filteredConversationList = conversationList.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mapping conversation list with messages
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
      {/* Search input for filtering conversations */}
      <div className="chat-list-search">
        <input
          type="search"
          placeholder="Search Conversation.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Button to add conversation */}
      <div className="chat-list-Add-conversation-btn">
        <p className="conversation-title">Conversation</p>
        <button
          className="conversation-btn"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Link to add conversation */}
          <Link to={"/contacts"}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/8162/8162980.png"
              alt=""
            />
          </Link>
        </button>
        {/* Tooltip for add conversation button */}
        {showTooltip && <div className="tooltip">Add Conversation</div>}
      </div>

      {/* Render conversation list */}
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
            {/* Profile picture */}
            <div className="profile-picture">
              <img src={conversation.dp} alt="Profile" className="sender-dp" />
            </div>
            {/* Details of the conversation */}
            <div className="details">
              <div className="name-last-seen">
                <p className="sender-name">{conversation.name}</p>
                <p className="last-sent-time">8:30pm</p>
              </div>
              {/* Last message sent */}
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
            {/* Delete button for conversation */}
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

// Exporting the component
export default ChatListSection;
