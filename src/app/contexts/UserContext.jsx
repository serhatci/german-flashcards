import React, { useContext, useState } from "react";

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

  function userHandler() {
    setUserSignedIn((userSignedIn) => !userSignedIn);
  }

  return (
    <UserContext.Provider value={userSignedIn}>
      <UserUpdateContext.Provider value={userHandler}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}
