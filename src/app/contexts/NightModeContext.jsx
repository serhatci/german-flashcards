import React, { useContext, useState } from "react";

const NightModeContext = React.createContext();
const NightModeUpdateContext = React.createContext();

export const useNightMode = () => {
  return useContext(NightModeContext);
};

export const useNightModeUpdate = () => {
  return useContext(NightModeUpdateContext);
};

export function NightModeProvider({ children }) {
  const [nightMode, setNightMode] = useState(false);

  function nightModeHandler() {
    setNightMode((nightModeOn) => !nightModeOn);
  }

  return (
    <NightModeContext.Provider value={nightMode}>
      <NightModeUpdateContext.Provider value={nightModeHandler}>
        {children}
      </NightModeUpdateContext.Provider>
    </NightModeContext.Provider>
  );
}
