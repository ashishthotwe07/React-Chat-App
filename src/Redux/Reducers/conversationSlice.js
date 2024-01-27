// conversationSlice.js

import { createSlice } from "@reduxjs/toolkit";
import Chats from "../../Data";

const initialState = {
  conversationList: [],
  selectedChat: null,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    addContactToConversation(state, action) {
      const contactIndex = action.payload;
      const existingContact = state.conversationList.find(
        (contact) => contact.name === Chats[contactIndex].name
      );
      if (!existingContact) {
        const conversation = Chats.find((contact, i) => i === contactIndex);
        state.conversationList.push(conversation);
      }
    },

    selectChat(state, action) {
      const user = Chats.find((contact) => contact.name === action.payload);
      // Check if the selected chat already exists in conversationList
      const existingChat = state.conversationList.find(chat => chat.name === user.name);
      if(existingChat) {
        // If the chat exists, update ownerMessages of the existing chat
        existingChat.ownerMessages = [];
        state.selectedChat = existingChat;
      } else {
        // If the chat doesn't exist, create a new one with ownerMessages
        state.selectedChat = { ...user, ownerMessages: [] }; 
      }
    },
    
    
    sendMessage(state, action) {
      if (state.selectedChat) {
        state.selectedChat.ownerMessages.push(action.payload);
      }
    },

    deleteConversation(state, action) {
      const index = action.payload;
      state.conversationList.splice(index, 1);
      // If the deleted conversation was the selected one, clear selectedChat
      if (state.selectedChat && state.selectedChat.name === state.conversationList[index]?.name) {
        state.selectedChat = null;
      }
    },
  },
});

export const conversationReducer = conversationSlice.reducer;
export const { addContactToConversation, selectChat, sendMessage, deleteConversation } =
  conversationSlice.actions;
export const conversationSelector = (state) =>
  state.conversationReducer.conversationList;
export const selectChatSelector = (state) =>
  state.conversationReducer.selectedChat;
