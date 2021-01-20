import "./icons.css";

import { useUser, useUserUpdate } from "../../contexts/UserContext";
import { useVolume, useVolumeUpdate } from "../../contexts/VolumeContext";
import {
  useNightMode,
  useNightModeUpdate,
} from "../../contexts/NightModeContext";
import {
  useSettings,
  useSettingsUpdate,
} from "../../contexts/SettingsContext";

export const HomeIcon = () => {
  return <i className="bi bi-house-fill white icon"></i>;
};

export const UserIcon = () => {
  const user = useUser();
  const iconType = user
    ? "bi bi-person-check-fill dark-green icon"
    : "bi bi-person-fill white icon";

  return <i className={iconType} onClick={useUserUpdate()}></i>;
};

export const SettingsIcon = () => {
  const user = useSettings();
  const iconType = user
    ? "bi bi-x-circle-fill red icon"
    : "bi bi-gear-fill white icon";

  return (
    <i
      className={iconType}
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

export const NightModeIcon = () => {
  const user = useNightMode();
  const iconType = user
    ? "bi bi-moon dark-red icon adjusted"
    : "bi bi-brightness-high white icon adjusted";

  return (
    <i
      className={iconType}
      id="night-mode-icon"
      alt="nightMode"
      onClick={useNightModeUpdate()}
    ></i>
  );
};

export const FlipIcon = (props) => {
  return (
    <i
      className={props.styles}
      id="flip-icon"
      alt="flip"
      onClick={() => props.func()}
    ></i>
  );
};

export const CorrectIcon = (props) => {
  return (
    <i
      className={props.styles}
      id="correct-icon"
      alt="correct"
      onClick={() => props.func(true)}
    ></i>
  );
};

export const WrongIcon = (props) => {
  return (
    <i
      className={props.styles}
      id="wrong-icon"
      alt="wrong"
      onClick={() => props.func(false)}
    ></i>
  );
};
