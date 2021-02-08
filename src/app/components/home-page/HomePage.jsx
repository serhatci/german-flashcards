import React from "react";
import Button from "../buttons/HomePageButtons.jsx";
import "./home-page.css";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";

const WelcomeInfo = () => {
  const { currentUser } = useAuth();
  const info = `ENV: ${process.env.NODE_ENV} ID: ${
    currentUser ? currentUser.email : "none"
  }`;
  return <p>{info}</p>;
};

const HomePage = (props) => {
  const theme = useTheme();
  const buttonTitles = localStorage.getItem("titles")
    ? JSON.parse(localStorage.getItem("titles"))
    : [];

  function createButtons() {
    return buttonTitles.map((title) => (
      <Button
        key={title[1]}
        title={title[0]}
        targetPage={"/flashcards/" + title[1]}
        style={theme.button}
      />
    ));
  }

  return (
    <div className="home-page-container fade-in" id="app-homepage">
      <div
        className="welcome-info"
        id="app-welcome-info"
        style={theme.welcome}
      >
        <WelcomeInfo />
      </div>
      <div className="button-container" id="app-button-container">
        <nav aria-labelledby="content-navigation">{createButtons()}</nav>
      </div>
    </div>
  );
};

export default HomePage;
