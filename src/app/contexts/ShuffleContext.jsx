import React, { useContext, useState } from "react";

const ShuffleContext = React.createContext();
const ShuffleUpdateContext = React.createContext();

export const useShuffle = () => {
  return useContext(ShuffleContext);
};

export const useShuffleUpdate = () => {
  return useContext(ShuffleUpdateContext);
};

export function ShuffleProvider({ children }) {
  const [shuffle, setShuffle] = useState(false);

  function shuffleHandler() {
    setShuffle((shuffle) => !shuffle);
  }

  return (
    <ShuffleContext.Provider value={shuffle}>
      <ShuffleUpdateContext.Provider value={shuffleHandler}>
        {children}
      </ShuffleUpdateContext.Provider>
    </ShuffleContext.Provider>
  );
}
