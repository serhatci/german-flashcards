import React, { useEffect, useState } from "react";

import "./home-page.css";
import Button from "../buttons/HomePageButtons";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { LoadingIcon } from "../icons/Icons";

const WelcomeInfo = () => {
  const { currentUser } = useAuth();
  const user = currentUser ? currentUser.email : "none";
  const env = process.env.NODE_ENV
  return <p>{`ENV: ${env} ID: ${user}`}</p>;
};

const MessageBoard = (props) => {
  return (
    <div className="loading-container">
      {props.loading ? <LoadingIcon /> : props.error}
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
      .then((response) => response.json())
      .then((data) => {
        if (!data.titles) throw new Error(data.message)
        for (let title in data) {
          localStorage.setItem(title, JSON.stringify(data[title]))
        };
        setButtons()
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
