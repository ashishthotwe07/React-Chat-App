import React from "react";
import Chats from "../../Data";
import "./ContactList.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addContactToConversation,
  selectChat,
} from "../../Redux/Reducers/conversationSlice";

const ContactList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function addToConversation(index) {
    dispatch(addContactToConversation(index));
    // After adding to conversation, directly open the chat
    dispatch(selectChat(Chats[index].name)); // Passing the name of the contact as payload
    navigate("/");
  }

  return (
    <div className="contact-list-container">
      <button className="close-btn">
        <Link to={"/"}>close</Link>
      </button>
      {Chats.map((contact, index) => (
        <div className="contact-item" key={index}>
          <div className="contact-dp">
            <img
              src={contact.dp}
              alt={`DP of ${contact.name}`}
              className="contact-dp-img"
            />
          </div>
          <div className="contact-info">
            <p className="contact-name">{contact.name}</p>
            <p className="contact-no">{contact.contactNo}</p>
          </div>
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

export default ContactList;
