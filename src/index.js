import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import "./styles/index.css";
import App from "./components/App";
import ContactsProvider from "./providers/ContactsProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={5000}
        placement="top-right"
      >
        <ContactsProvider>
          <App />
        </ContactsProvider>
      </ToastProvider>
    </Router>
  </React.StrictMode>
);
