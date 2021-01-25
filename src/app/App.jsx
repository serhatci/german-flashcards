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

const App = () => {
  let theme = useTheme();
  const [homeButtons, setHomeButtons] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://my-json-server.typicode.com/serhatci/mockdb/buttons")
      .then((response) => response.json())
      .then((data) => {
        setHomeButtons(data);
        setLoading(false);
      });
  }, []);

  const getMainPage = isLoading ? (
    <div className="loading-container">
      <LoadingIcon />
    </div>
  ) : (
    <Main buttons={homeButtons} />
  );

  return (
    <div className="app-container" id="app-container" style={theme.backg}>
      <header className="header">
        <Header />
      </header>
      <main className="main-page">{getMainPage}</main>
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
