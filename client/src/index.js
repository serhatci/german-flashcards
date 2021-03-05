import React from "react";
import ReactDOM from "react-dom";

import App from "./app/App.jsx";
import reportWebVitals from "./reportWebVitals";
import { MemoryRouter as Router } from "react-router-dom";
import { AuthProvider } from "./app/contexts/AuthContext";
import { ThemeProvider } from "./app/contexts/ThemeContext";
import "./index.css";
import { DataProvider } from "./app/contexts/DataContext.jsx";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
        <ThemeProvider>
          <Router>
            <App />
          </Router>
        </ThemeProvider>
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
