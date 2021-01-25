import "./settings.css";
import { useSettings } from "../../contexts/SettingsContext";
import { VolumeProvider } from "../../contexts/VolumeContext";

import { VolumeIcon, ThemeIcon } from "../icons/Icons.jsx";
import { useLocation } from "react-router-dom";

const Settings = () => {
  const clicked = useSettings();
  const loc = useLocation();

  // setting is disabled at authorization pages
  const getStyle = (clicked) => {
    if (loc.pathname === "/" || loc.pathname === "/flashcards") {
      return clicked ? "settings-wrapper show" : "settings-wrapper hide";
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
          <ThemeIcon />
        </nav>
      </div>
    </div>
  );
};

export default Settings;
