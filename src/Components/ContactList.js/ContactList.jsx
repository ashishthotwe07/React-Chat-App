// Importing necessary libraries and components
import React from "react";
import Chats from "../../Data";
import "./ContactList.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addContactToConversation,
  selectChat,
} from "../../Redux/Reducers/conversationSlice";

// Functional component for rendering the contact list
const ContactList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to add a contact to the conversation and open the chat
  function addToConversation(index) {
    dispatch(addContactToConversation(index)); // Dispatching action to add contact to conversation
    // After adding to conversation, directly open the chat
    dispatch(selectChat(Chats[index].name)); // Passing the name of the contact as payload
    navigate("/"); // Navigate to the chat page
  }

  return (
    <div className="contact-list-container">
      {/* Button to close the contact list */}
      <button className="close-btn">
        <Link to={"/"}>close</Link>
      </button>
      {/* Mapping over the contacts list and rendering each contact */}
      {Chats.map((contact, index) => (
        <div className="contact-item" key={index}>
          {/* Display contact profile picture */}
          <div className="contact-dp">
            <img
              src={contact.dp}
              alt={`DP of ${contact.name}`}
              className="contact-dp-img"
            />
          </div>
          {/* Display contact information */}
          <div className="contact-info">
            <p className="contact-name">{contact.name}</p>
            <p className="contact-no">{contact.contactNo}</p>
          </div>
          {/* Button to add contact to conversation */}
          <button
            onClick={() => addToConversation(index)}
            className="add-to-conversation-btn"
          >
            Add to Conversation
          </button>
        </div>
      ))}
    </div>
  );
};

// Exporting the component
export default ContactList;
