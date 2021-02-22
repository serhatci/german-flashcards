import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";

const ButtonsContext = React.createContext();

export const useButtons = () => {
  return useContext(ButtonsContext);
};

export function ButtonsProvider({ children }) {
  const [settingsClicked, setSettingsClicked] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const loc = useLocation();

  // settings are disabled except home and flashcard pages
  function settingsHandler() {
    if (loc.pathname === "/" || loc.pathname.includes("flashcards")) {
      setSettingsClicked((settingsClicked) => !settingsClicked);
    }
  }

  function shuffleHandler() {
    setShuffle((shuffle) => !shuffle);
  }

  return (
    <ButtonsContext.Provider
      value={{
        settingsClicked,
        settingsHandler,
        shuffle,
        shuffleHandler,
      }}>
      {children}
    </ButtonsContext.Provider>
  );
}
