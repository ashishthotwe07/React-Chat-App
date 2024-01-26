import "./App.css";
import ChatContainer from "../src/Components/ChatContainer/ChatContainer";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ContactList from "./Components/ContactList.js/ContactList";
import store from "./Redux/Store";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ChatContainer />,
      children: [{ path: "/contacts", element: <ContactList /> }],
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </Provider>
    </>
  );
}

export default App;
