# Redux Chat App

## Overview
The Redux Chat App is a simple web application built using React and Redux Toolkit. It serves as an educational project to learn and practice Redux state management in the context of a chat application. The app allows users to view a list of conversations, select a conversation to view messages, and send messages (though the messages are currently dummy data).

## Features
1. **Conversation List:**
   - Displays a list of conversations with user profile pictures, names, and last message timestamps.
   - Supports searching conversations by the contact's name.

2. **Message Section:**
   - Displays messages within a selected conversation.
   - Messages are categorized as user messages and owner messages.
   - Allows sending messages to the selected conversation (currently sending dummy messages).

3. **Redux Integration:**
   - Utilizes Redux Toolkit for state management.
   - Defines Redux actions and reducers for adding contacts, selecting chats, and sending messages.
   - Manages conversation data, including conversation list and selected chat.

## Technologies Used
- React: Frontend JavaScript library for building user interfaces.
- Redux Toolkit: Redux library that simplifies Redux setup and usage with modern best practices.
- React Router: Library for declarative routing in React applications.
- Redux Persist: Library for persisting certain parts of the Redux store across sessions.

## Setup Instructions
1. Clone the repository from GitHub.
2. Install dependencies using `npm install`.
3. Run the development server using `npm start`.
4. Access the app in your browser at the specified URL.

## Future Improvements
- Implement real-time messaging functionality using WebSockets for instant message delivery.
- Enhance user experience with features like message reactions, file/image sharing, and notifications.
- Improve error handling and validation for better robustness.
- Enhance styling and UI/UX for a more visually appealing and intuitive interface.


