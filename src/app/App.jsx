import React, { useEffect, useState } from "react";
import { SettingsProvider } from "./contexts/SettingsContext";
import { useTheme } from "./contexts/ThemeContext";
import "./app.css";

// Main App components
import Header from "./components/header-footer/Header.jsx";
import Main from "./components/main/Main.jsx";
import Footer from "./components/header-footer/Footer.jsx";
import Settings from "./components/settings-page/Settings.jsx";
import { LoadingIcon } from "./components/icons/Icons.jsx";
import { useAuth } from "./contexts/AuthContext";

const App = () => {
  let theme = useTheme();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:5000/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: currentUser ? currentUser.uid : "guest" }),
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(
          "Sorry!... Something went terribly wrong, please try again later..."
        );
      })
      .then((data) => {
        for (let title in data) {
          localStorage.setItem(title, JSON.stringify(data[title]));
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [currentUser]);

  const getMainPage = () => {
    if (isLoading) {
      return (
        <div className="loading-container">
          <LoadingIcon />
        </div>
      );
    } else if (error) {
      return <div className="loading-container">{error.message}</div>;
    }
    return <Main />;
  };

  return (
    <div className="app-container" id="app-container" style={theme.backg}>
      <header className="header">
        <Header />
      </header>
      <main className="main-page">{getMainPage()}</main>
      <SettingsProvider>
        <footer className="footer">
          <Footer />
        </footer>
        <Settings />
      </SettingsProvider>
    </div>
  );
};

export default App;
