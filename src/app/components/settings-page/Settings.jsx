import "./settings.css";
import { useSettings } from "../../contexts/SettingsContext";

import { ShuffleIcon, ThemeIcon } from "../icons/Icons.jsx";

const Settings = () => {
  const clicked = useSettings();

  // setting is disabled at authorization pages
  const getStyle = (clicked) => {
    return clicked ? "settings-wrapper show" : "settings-wrapper hide";
  };

  return (
    <div className={getStyle(clicked)} id="settings-wrapper">
      <div className="flex-vertical settings-box" id="settings-box">
        <nav aria-labelledby="settings-navigation" className="flex-horizontal">
          <ShuffleIcon />
          <ThemeIcon />
        </nav>
      </div>
    </div>
  );
};

export default Settings;
