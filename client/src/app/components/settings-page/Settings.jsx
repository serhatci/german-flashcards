import { memo } from "react";

import { useButtons } from "../../contexts/ButtonsContext";
import { ShuffleIcon, ThemeIcon, EditIcon } from "../icons/Icons.jsx";
import "./settings.css";

const Settings = memo(() => {
  const button = useButtons();

  // setting is disabled at authorization pages
  const getStyle = () => {
    return button.settingsClicked
      ? "settings-wrapper show"
      : "settings-wrapper hide";
  };

  return (
    <div className={getStyle()} id="settings-wrapper">
      <div className="flex-vertical settings-box" id="settings-box">
        <nav aria-labelledby="settings-navigation" className="flex-horizontal">
          <ThemeIcon />
          <ShuffleIcon />
          <EditIcon />
        </nav>
      </div>
    </div>
  );
});

export default Settings;
