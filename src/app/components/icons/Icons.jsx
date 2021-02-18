import "./icons.css";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { useShuffle, useShuffleUpdate } from "../../contexts/ShuffleContext";
import { useTheme, useThemeUpdate } from "../../contexts/ThemeContext";
import {
  useSettings,
  useSettingsUpdate,
} from "../../contexts/SettingsContext";

export const HomeIcon = () => {
  return (
    <Link to="/">
      <i id="home-icon" alt="home" className="bi bi-house-fill white icon"></i>
    </Link>
  );
};

export const UserIcon = () => {
  const { currentUser } = useAuth();
  const iconType = currentUser
    ? "bi bi-person-check-fill dark-green icon"
    : "bi bi-person-fill white icon";

  const targetPath = currentUser ? "/user-page" : "/login";
  const theme = useTheme();
  const updateTheme = useThemeUpdate();
  const settingsClicked = useSettings();
  const updateSettingsClicked = useSettingsUpdate();

  function setThemeToDay() {
    if (theme.name === "Night") updateTheme();
    if (settingsClicked) updateSettingsClicked();
  }

  return (
    <Link to={targetPath}>
      <i
        id="user-icon"
        alt="user"
        className={iconType}
        onClick={setThemeToDay}></i>
    </Link>
  );
};

export const SettingsIcon = () => {
  const clicked = useSettings();
  const loc = useLocation();

  // Settings are disabled at authorization pages
  const iconType = () => {
    if (loc.pathname === "/" || loc.pathname.includes("flashcards"))
      return clicked
        ? "bi bi-x-circle-fill red icon"
        : "bi bi-gear-fill white icon";
    return "bi bi-gear-fill grey icon";
  };

  return (
    <i
      className={iconType()}
      id="setting-icon"
      alt="settings"
      onClick={useSettingsUpdate()}></i>
  );
};

export const ShuffleIcon = () => {
  const shuffle = useShuffle();
  const iconType = shuffle
    ? "bi bi-shuffle dark-blue icon adjusted"
    : "bi bi-shuffle white icon adjusted";
  return (
    <i
      className={iconType}
      id="shuffle-icon"
      alt="shuffle"
      onClick={useShuffleUpdate()}></i>
  );
};

export const ThemeIcon = () => {
  const theme = useTheme();
  const iconType =
    theme.name === "Night"
      ? "bi bi-brightness-high white icon adjusted"
      : "bi bi-moon dark-blue icon adjusted";

  return (
    <i
      className={iconType}
      id="night-mode-icon"
      alt="nightMode"
      onClick={useThemeUpdate()}></i>
  );
};

export const EditIcon = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  function iconType() {
    return currentUser
      ? "bi bi bi-pen white icon adjusted"
      : "bi bi bi-pen grey icon adjusted";
  }

  function openEditPage() {
    if (!currentUser) return;

    console.log(location.pathname);
  }

  return (
    <i
      className={iconType()}
      id="edit-icon"
      alt="editIcon"
      onClick={() => openEditPage()}></i>
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
      style={theme.flipButton}></i>
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
      style={theme.correctButton}></i>
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
      style={theme.wrongButton}></i>
  );
};

export const LoadingIcon = () => {
  return (
    <i
      className="bi bi-gear-wide icon large rotate white"
      id="loading-icon"
      alt="loading"></i>
  );
};
