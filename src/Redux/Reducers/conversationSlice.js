import { createSlice } from "@reduxjs/toolkit";
import Chats from "../../Data";

const initialState = {
  conversationList: [],
  selectedChat: null,
  ownerMessages: [], // Initialize ownerMessages separately
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
      const existingChat = state.conversationList.find(
        (chat) => chat.name === user.name
      );
      console.log(user);
      if (existingChat) {
        state.selectedChat = existingChat;
      } else {
        state.selectedChat = { ...user };
      }
    },

    sendMessage(state, action) {
      if (state.selectedChat) {
        state.ownerMessages.push({
          user: state.selectedChat,
          message: action.payload,
        });
      }
    },

    deleteConversation(state, action) {
      const index = action.payload;

      // If the deleted conversation was the selected one, clear selectedChat
      if (
        state.selectedChat &&
        state.selectedChat.name === state.conversationList[index]?.name
      ) {
        state.selectedChat = null;
        state.conversationList.splice(index, 1);
      } else {
        state.conversationList.splice(index, 1);
      }
    },
  },
});

export const conversationReducer = conversationSlice.reducer;
export const {
  addContactToConversation,
  selectChat,
  sendMessage,
  deleteConversation,
} = conversationSlice.actions;
export const conversationSelector = (state) =>
  state.conversationReducer.conversationList;
export const selectChatSelector = (state) =>
  state.conversationReducer.selectedChat;
export const ownerMessageSelector = (state) =>
  state.conversationReducer.ownerMessages;
