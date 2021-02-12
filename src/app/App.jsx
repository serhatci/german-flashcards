import React from "react";
import { SettingsProvider } from "./contexts/SettingsContext";
import { ShuffleProvider } from "./contexts/ShuffleContext";
import { useTheme } from "./contexts/ThemeContext";
import "./app.css";

// Main App components
import Header from "./components/header-footer/Header.jsx";
import Main from "./components/main/Main.jsx";
import Footer from "./components/header-footer/Footer.jsx";
import Settings from "./components/settings-page/Settings.jsx";

const App = () => {
  let theme = useTheme();

  return (
    <ShuffleProvider>
      <SettingsProvider >
        <div style={theme.backg} className="app-container" id="app-container" >
          <header className="header" >
            <Header />
          </header>
          <main className="main-page" >
            <Main />
          </main><footer className="footer" >
            <Footer />
          </footer> <Settings />
        </div>
      </SettingsProvider>
    </ShuffleProvider>
  );
};

export default App;