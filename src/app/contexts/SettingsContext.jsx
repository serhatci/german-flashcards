import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";

const SettingsContext = React.createContext();
const SettingsUpdateContext = React.createContext();

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const useSettingsUpdate = () => {
  return useContext(SettingsUpdateContext);
};

export function SettingsProvider({ children }) {
  const [settingsClicked, setSettingsClicked] = useState(false);
  const loc = useLocation();

  // settings are disabled at authorization pages
  function settingsHandler() {
    if (loc.pathname === "/" || loc.pathname.includes("flashcards")) {
      setSettingsClicked((settingsClicked) => !settingsClicked);
    }
  }

  return (
    <SettingsContext.Provider value={settingsClicked}>
      <SettingsUpdateContext.Provider value={settingsHandler}>
        {children}
      </SettingsUpdateContext.Provider>
    </SettingsContext.Provider>
  );
}
