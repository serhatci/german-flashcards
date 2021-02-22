import React from "react";
import { useTheme } from "./contexts/ThemeContext";
import EditBox from "./components/edit-pages/EditBox";
import "./app.css";

// Main App components
import Header from "./components/header-footer/Header.jsx";
import Main from "./components/main/Main.jsx";
import Footer from "./components/header-footer/Footer.jsx";
import Settings from "./components/settings-page/Settings.jsx";
import { ButtonsProvider } from "./contexts/ButtonsContext";

const App = () => {
  let theme = useTheme();

  return (
    <ButtonsProvider>
      <div style={theme.backg} className="app-container" id="app-container">
        <header className="header">
          <Header />
        </header>
        <main className="main-page">
          <Main />
        </main>
        <footer className="footer">
          <Footer />
        </footer>
        <Settings />
        <EditBox />
      </div>
    </ButtonsProvider>
  );
};

export default App;
