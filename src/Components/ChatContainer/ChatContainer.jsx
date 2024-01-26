import React from "react";
import "./ChatContainer.css";
import ChatListSection from "../ChatList-Section/ChatListSection";
import ChatMessageSection from "../ChatMessage-Section/ChatMessageSection";
import { Outlet } from "react-router-dom";

export default function ChatContainer() {
  return (
    <div className="chatContainer">
      <div className="left">
        <ChatListSection />
      </div>
      <div className="right">
        <ChatMessageSection />
      </div>

      <Outlet />
    </div>
  );
}
