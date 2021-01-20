import React, { useContext, useState } from "react";

const VolumeContext = React.createContext();
const VolumeUpdateContext = React.createContext();

export const useVolume = () => {
  return useContext(VolumeContext);
};

export const useVolumeUpdate = () => {
  return useContext(VolumeUpdateContext);
};

export function VolumeProvider({ children }) {
  const [volumeMuteOn, setVolumeMuteOn] = useState(false);

  function volumeHandler() {
    setVolumeMuteOn((volumeMuteOn) => !volumeMuteOn);
  }

  return (
    <VolumeContext.Provider value={volumeMuteOn}>
      <VolumeUpdateContext.Provider value={volumeHandler}>
        {children}
      </VolumeUpdateContext.Provider>
    </VolumeContext.Provider>
  );
}
