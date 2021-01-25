import "./icons.css";
import { useLocation } from "react-router-dom";

import { useUser, useUserUpdate } from "../../contexts/UserContext";
import { useVolume, useVolumeUpdate } from "../../contexts/VolumeContext";
import { useTheme, useThemeUpdate } from "../../contexts/ThemeContext";
import {
  useSettings,
  useSettingsUpdate,
} from "../../contexts/SettingsContext";

export const HomeIcon = () => {
  return (
    <i id="home-icon" alt="home" className="bi bi-house-fill white icon"></i>
  );
};

export const UserIcon = () => {
  let user = useUser();
  const iconType = user
    ? "bi bi-person-check-fill dark-green icon"
    : "bi bi-person-fill white icon";

  return (
    <i
      id="user-icon"
      alt="user"
      className={iconType}
      onClick={useUserUpdate()}
    ></i>
  );
};

export const SettingsIcon = () => {
  const clicked = useSettings();
  const loc = useLocation();

  // Settings are disabled at authorization pages
  const iconType = () => {
    if (loc.pathname === "/" || loc.pathname === "/flashcards") {
      return clicked
        ? "bi bi-x-circle-fill red icon"
        : "bi bi-gear-fill white icon";
    } else {
      return "bi bi-gear-fill dark-red icon";
    }
  };
  return (
    <i
      className={iconType()}
      id="setting-icon"
      alt="settings"
      onClick={useSettingsUpdate()}
    ></i>
  );
};

export const VolumeIcon = () => {
  const user = useVolume();
  const iconType = user
    ? "bi bi-volume-mute-fill dark-red icon medium"
    : "bi bi-volume-up-fill white icon medium";
  return (
    <i
      className={iconType}
      id="volume-icon"
      alt="volume"
      onClick={useVolumeUpdate()}
    ></i>
  );
};

export const ThemeIcon = () => {
  const theme = useTheme();
  const iconType =
    theme.name === "Night"
      ? "bi bi-moon dark-red icon adjusted"
      : "bi bi-brightness-high white icon adjusted";

  return (
    <i
      className={iconType}
      id="night-mode-icon"
      alt="nightMode"
      onClick={useThemeUpdate()}
    ></i>
  );
};

export const FlipIcon = (props) => {
  let theme = useTheme();
  return (
    <i
      className={props.styles}
      id="flip-icon"
      alt="flip"
      onClick={() => props.func()}
      style={theme.flipButton}
    ></i>
  );
};

export const CorrectIcon = (props) => {
  let theme = useTheme();
  return (
    <i
      className={props.styles}
      id="correct-icon"
      alt="correct"
      onClick={() => props.func(true)}
      style={theme.correctButton}
    ></i>
  );
};

export const WrongIcon = (props) => {
  let theme = useTheme();
  return (
    <i
      className={props.styles}
      id="wrong-icon"
      alt="wrong"
      onClick={() => props.func(false)}
      style={theme.wrongButton}
    ></i>
  );
};
