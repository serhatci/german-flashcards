import React from "react";
import "./settings.css";
import { VolumeIcon, NightModeIcon } from "../icons/Icons.jsx";

import { useSettings } from "../../contexts/SettingsContext";
import { VolumeProvider } from "../../contexts/VolumeContext";
import { NightModeProvider } from "../../contexts/NightModeContext";

const Settings = () => {
  const clicked = useSettings();
  const getStyle = (clicked) => {
    if (clicked) {
      return "settings-wrapper show";
    } else {
      return "settings-wrapper hide";
    }
  };

  return (
    <div className={getStyle(clicked)} id="settings-wrapper">
      <div className="flex-vertical settings-box" id="settings-box">
        <nav aria-labelledby="settings-navigation" className="flex-horizontal">
          <VolumeProvider>
            <VolumeIcon />
          </VolumeProvider>
          <NightModeProvider>
            <NightModeIcon />
          </NightModeProvider>
        </nav>
      </div>
    </div>
  );
};

export default Settings;
