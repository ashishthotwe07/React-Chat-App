// Importing React library for creating React components
import React from "react";

// Importing the CSS file for styling
import "./ChatContainer.css";

// Importing components used in the ChatContainer
import ChatListSection from "../ChatList-Section/ChatListSection";
import ChatMessageSection from "../ChatMessage-Section/ChatMessageSection";

// Importing Outlet from react-router-dom to render nested routes
import { Outlet } from "react-router-dom";

// Functional component representing the main chat container
export default function ChatContainer() {
  return (
    // Main container div for the chat interface
    <div className="chatContainer">
      {/* Left section containing the chat list */}
      <div className="left">
        <ChatListSection />
      </div>

      {/* Right section containing the chat messages */}
      <div className="right">
        <ChatMessageSection />
      </div>

      {/* Outlet for rendering nested routes */}
      <Outlet />
    </div>
  );
}
