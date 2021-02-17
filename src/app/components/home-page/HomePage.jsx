import React, { useEffect, useState } from "react";

import "./home-page.css";
import Button from "../buttons/HomePageButtons";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { LoadingIcon } from "../icons/Icons";

const HomePage = () => {
  const theme = useTheme();
  const { currentUser } = useAuth();

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [buttonTitles, setButtonTitles] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("titles")) return setButtons();

    const headers = {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authentication: currentUser ? currentUser.uid : "guest",
      },
    };

    setLoading(true);
    fetch("http://127.0.0.1:5000/api/", headers)
      .then((response) => response.json())
      .then((data) => {
        if (!data.titles) throw new Error(data.message);
        for (let title in data) {
          localStorage.setItem(title, JSON.stringify(data[title]));
        }
        setButtons();
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [currentUser]);

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

  return (
    <div className="home-page-container fade-in" id="app-homepage">
      {isLoading || error ? (
        <MessageBoard loading={isLoading} error={error} />
      ) : (
        <MainPage create={createButtons} theme={theme} />
      )}
    </div>
  );
};

const MainPage = (props) => {
  return (
    <>
      <div
        style={props.theme.welcome}
        className="welcome-info"
        id="welcome-info">
        <WelcomeInfo />
      </div>
      <div className="button-container" id="button-container">
        <nav aria-labelledby="content-navigation">{props.create()}</nav>
      </div>
    </>
  );
};

const WelcomeInfo = () => {
  const username = JSON.parse(localStorage.getItem("username"));
  const { currentUser } = useAuth();
  const env = process.env.NODE_ENV;

  if (username === "master" && !currentUser)
    return (
      <p>{`(${env}) Hello Guest! You can signup and have your own flashcards`}</p>
    );

  if (username === "master" && currentUser)
    return <p>{`(${env}) Welcome Master!`}</p>;

  return (
    <p>{`(${env}) Hello ${username}! Use settings button to create your own flashcards.`}</p>
  );
};

const MessageBoard = (props) => {
  return (
    <div className="loading-container">
      {props.loading ? <LoadingIcon /> : props.error}
    </div>
  );
};

export default HomePage;
