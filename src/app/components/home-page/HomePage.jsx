import React, { useEffect, useState } from "react";

import "./home-page.css";
import Button from "../buttons/HomePageButtons.jsx";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { LoadingIcon } from "../icons/Icons.jsx";

const WelcomeInfo = () => {
  const { currentUser } = useAuth();
  const env = process.env.NODE_ENV
  const user = currentUser ? currentUser.email : "none";
  return <p>{`ENV: ${env} ID: ${user}`}</p>;
};

const HomePage = (props) => {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [buttonTitles, setButtonTitles] = useState([]);

  useEffect(() => {
    const headers = {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({ uid: currentUser ? currentUser.uid : "guest" }),
    };

    if (!localStorage.getItem("titles")) {
      setLoading(true);

      fetch("http://127.0.0.1:5000/api/", headers)
        .finally(() => setLoading(false))
        .then((response) => resolveResponse(response))
        .then((data) => {
          addLocalStorage(data);
          setButtons();
        })
        .catch((error) => setError(error));
    } else {
      setButtons();
    }
  }, [currentUser]);

  function resolveResponse(response) {
    if (response.status === 401) return { titles: [] };
    return response.json();
  }

  function addLocalStorage(data) {
    for (let title in data) {
      localStorage.setItem(title, JSON.stringify(data[title]));
    }
  }

  function setButtons() {
    setButtonTitles(JSON.parse(localStorage.getItem("titles")));
  }

  function createButtons() {
    return buttonTitles.map((title) => (
      <Button
        key={title.camelCase}
        title={title.str}
        targetPage={"/flashcards/" + title.camelCase}
        style={theme.button}
      />
    ));
  }

  function getMainPage() {
    if (isLoading || error) {
      return (
        <div className="loading-container">
          {isLoading ? <LoadingIcon /> : error.message}
        </div>
      );
    }
    return (
      <>
        <div
          className="welcome-info"
          id="app-welcome-info"
          style={theme.welcome}
        >
          <WelcomeInfo />
        </div>
        <div className="button-container" id="button-container">
          <nav aria-labelledby="content-navigation">{createButtons()}</nav>
        </div>
      </>
    );
  }

  return (
    <div className="home-page-container fade-in" id="app-homepage">
      {getMainPage()}
    </div>
  );
};

export default HomePage;
