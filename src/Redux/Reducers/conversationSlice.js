import { createSlice } from "@reduxjs/toolkit";
import Chats from "../../Data";

const initialState = {
  conversationList: [],
  selectedChat: null, // Change to null initially
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
      state.selectedChat = { ...user, ownerMessages: [] }; 
    },
    
    sendMessage(state, action) {
      if (state.selectedChat) {
        state.selectedChat.ownerMessages.push(action.payload);
      }
    },
  },
});

export const conversationReducer = conversationSlice.reducer;
export const { addContactToConversation, selectChat, sendMessage } =
  conversationSlice.actions;
export const conversationSelector = (state) =>
  state.conversationReducer.conversationList;
export const selectChatSelector = (state) =>
  state.conversationReducer.selectedChat;
