import React, { useEffect, useState } from "react";

import "./home-page.css";
import Button from "../buttons/HomePageButtons.jsx";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { LoadingIcon } from "../icons/Icons.jsx";

const WelcomeInfo = () => {
  const { currentUser } = useAuth();
  const user = currentUser ? currentUser.email : "none";
  const env = process.env.NODE_ENV
  return <p>{`ENV: ${env} ID: ${user}`}</p>;
};

const MessageBoard = (props) => {
  return (
    <div className="loading-container">
      {props.loading ? <LoadingIcon /> : props.error.message}
    </div>
  );
}

const HomePage = () => {
  const theme = useTheme();
  const { currentUser } = useAuth();

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [buttonTitles, setButtonTitles] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("titles")) return setButtons()

    const uid = { uid: currentUser ? currentUser.uid : "guest" }
    const headers = {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(uid),
    };

    setLoading(true);
    fetch("http://127.0.0.1:5000/api/", headers)
      .then((response) => resolveResponse(response))
      .then((data) => {
        addLocalStorage(data);
        setButtons()
      })
      .finally(() => setLoading(false))
      .catch((error) => setError(error));

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
    if (isLoading || error) return <MessageBoard loading={isLoading} error={error} />

    return (
      <>
        <div style={theme.welcome} className="welcome-info" id="welcome-info">
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
