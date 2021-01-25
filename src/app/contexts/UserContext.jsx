import React, { useContext, useState } from "react";
import { useTheme, useThemeUpdate } from "./ThemeContext";

const UserContext = React.createContext();
const UserUpdateContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const useUserUpdate = () => {
  return useContext(UserUpdateContext);
};

export function UserProvider({ children }) {
  const [userSignedIn, setUserSignedIn] = useState(false);
  let theme = useTheme();
  let themeUpdate = useThemeUpdate();

  // theme is always day at authorization pages
  function userHandler() {
    setUserSignedIn((userSignedIn) => !userSignedIn);
    if (theme.name !== "Day") {
      themeUpdate();
    }
  }

  return (
    <UserContext.Provider value={userSignedIn}>
      <UserUpdateContext.Provider value={userHandler}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}
