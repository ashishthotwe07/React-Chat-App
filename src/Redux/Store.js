// store.js
import { configureStore } from "@reduxjs/toolkit";
import { conversationReducer } from "./Reducers/conversationSlice";
const store = configureStore({
  reducer: {
    conversationReducer,
  },
});

export default store;
