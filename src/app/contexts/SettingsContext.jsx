import React, { useContext, useState } from "react";

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

  function settingsHandler() {
    setSettingsClicked((settingsClicked) => !settingsClicked);
  }

  return (
    <SettingsContext.Provider value={settingsClicked}>
      <SettingsUpdateContext.Provider value={settingsHandler}>
        {children}
      </SettingsUpdateContext.Provider>
    </SettingsContext.Provider>
  );
}
