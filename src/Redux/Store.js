import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { conversationReducer } from "./Reducers/conversationSlice";

// Configuration for redux-persist
const persistConfig = {
  key: "root", // Key for the persisted state
  storage, // Storage mechanism (e.g., localStorage)
  blacklist: ["register"], // Exclude the 'register' part from being persisted
};

// Wrap conversationReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, conversationReducer);

// Configure the Redux store
const store = configureStore({
  reducer: {
    conversationReducer: persistedReducer, // Set up reducer with persisted state
  },
  middleware: getDefaultMiddleware({
    // Disable serializable check to avoid warning/error with redux-persist
    serializableCheck: false,
  }),
});

// Create persistor for persisting state
export const persistor = persistStore(store);

// Export the Redux store
export default store;
