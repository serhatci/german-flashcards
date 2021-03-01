import React, { useContext, useState } from "react";

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const useThemeUpdate = () => {
  return useContext(ThemeUpdateContext);
};

const themes = {
  day: {
    name: "Day",
    backg: {
      backgroundColor: "rgb(220, 226, 218)",
      transition: "background-color 0.2s linear",
    },
    button: {
      backgroundColor: "#f1f7f2",
      color: "#1d50af",
      transition: "background-color 0.2s linear",
    },
    welcome: {
      backgroundColor: "rgb(243, 243, 128)",
      transition: "background-color 0.2s linear",
    },
    words: {
      color: "black",
      transition: "background-color 0.2s linear",
    },
    flipButton: {
      color: "black",
      transition: "background-color 0.2s linear",
    },
    wrongButton: {
      color: "rgb(122, 2, 2)",
      transition: "background-color 0.2s linear",
    },
    correctButton: {
      color: "#086108ec",
      transition: "background-color 0.2s linear",
    },
    score: {
      backgroundColor: "#cbf1cb",
      transition: "background-color 0.2s linear",
    },
  },
  night: {
    name: "Night",
    backg: {
      backgroundColor: "#0f3f65",
      transition: "background-color 0.2s linear",
    },
    button: {
      backgroundColor: "rgb(21 77 122)",
      color: "wheat",
      transition: "background-color 0.2s linear",
    },
    welcome: {
      backgroundColor: "rgb(202 202 199)",
      transition: "background-color 0.2s linear",
    },
    words: {
      color: "rgb(189 189 121)",
      transition: "background-color 0.2s linear",
    },
    flipButton: {
      color: "rgb(146 150 152)",
      transition: "background-color 0.2s linear",
    },
    wrongButton: {
      color: "#e06513",
      transition: "background-color 0.2s linear",
    },
    correctButton: {
      color: "#22b122",
      transition: "background-color 0.2s linear",
    },
    score: {
      backgroundColor: "#83a7c4",
      transition: "background-color 0.2s linear",
    },
  },
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(themes.day);

  function themeHandler() {
    setTheme((theme) => (theme === themes.day ? themes.night : themes.day));
  }

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={themeHandler}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
