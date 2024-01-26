// store.js
import { configureStore } from "@reduxjs/toolkit";
import { conversationReducer } from "./Reducers/conversationSlice";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["register"], // Exclude the 'register' part from being persisted
};

const persistedReducer = persistReducer(persistConfig, conversationReducer);

const store = configureStore({
  reducer: {
    conversationReducer: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);
export default store;
