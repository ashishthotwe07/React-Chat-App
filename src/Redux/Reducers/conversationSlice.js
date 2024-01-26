import { createSlice } from "@reduxjs/toolkit";
import Chats from "../../Data";

const initialState = {
  conversationList: [],
  selectedChat: {},
  ownerMessages: [],
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    addContactToConversation(state, action) {
      const conversation = Chats.find((contact, i) => i === action.payload);
      state.conversationList.push(conversation);
    },
    selectChat(state, action) {
      const user = Chats.find((contact) => contact.name === action.payload);
      state.selectedChat = user;
      console.log(state.selectedChat);
    },
    sendMessage(state, action) {
      console.log(state.selectedChat);
      console.log(action.payload);
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
export const ownerMessagesSelector = (state) =>
  state.conversationReducer.ownerMessages;
