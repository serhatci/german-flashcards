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

  return <i className={iconType} onClick={useSettingsUpdate()}></i>;
};

export const VolumeIcon = () => {
  const user = useVolume();
  const iconType = user
    ? "bi bi-volume-mute-fill red settings-icon"
    : "bi bi-volume-up-fill white settings-icon";
  return <i className={iconType} onClick={useVolumeUpdate()}></i>;
};

export const NightModeIcon = () => {
  const user = useNightMode();
  const iconType = user
    ? "bi bi-moon white small-icon"
    : "bi bi-brightness-high white small-icon";

  return <i className={iconType} onClick={useNightModeUpdate()}></i>;
};
