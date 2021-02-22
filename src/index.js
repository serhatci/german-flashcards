import React from "react";
import ReactDOM from "react-dom";

import App from "./app/App.jsx";
import reportWebVitals from "./reportWebVitals";
import { MemoryRouter as Router } from "react-router-dom";
import { AuthProvider } from "./app/contexts/AuthContext";
import { ThemeProvider } from "./app/contexts/ThemeContext";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
