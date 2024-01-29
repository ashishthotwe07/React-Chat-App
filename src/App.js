// Importing the CSS file for styling
import "./App.css";

// Importing necessary components and libraries
import ChatContainer from "../src/Components/ChatContainer/ChatContainer";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ContactList from "./Components/ContactList.js/ContactList";
import store from "./Redux/Store";

function App() {
  // Creating a browser router instance with a route configuration
  const router = createBrowserRouter([
    {
      // Root path configuration
      path: "/",
      // Element to render for the root path
      element: <ChatContainer />,
      // Nested route configuration for '/contacts' path
      children: [{ path: "/contacts", element: <ContactList /> }],
    },
  ]);

  // Rendering the main application component
  return (
    <>
      {/* Providing Redux store to the application */}
      <Provider store={store}>
        {/* Main container for the application */}
        <div className="App">
          {/* Providing the router instance to the application */}
          <RouterProvider router={router} />
        </div>
      </Provider>
    </>
  );
}

// Exporting the App component as default
export default App;
