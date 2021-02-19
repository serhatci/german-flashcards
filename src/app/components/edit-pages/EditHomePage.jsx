import React, { useEffect, useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { LoadingIcon } from "../icons/Icons";
import { useTheme, useThemeUpdate } from "../../contexts/ThemeContext";
import {
  EditSaveButton,
  EditCancelButton,
  EditPageButton,
} from "../buttons/EditButtons";
import "./edit.css";

const EditHomePage = () => {
  const theme = useTheme();
  const updateTheme = useThemeUpdate();

  const { currentUser } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [buttonTitles, setButtonTitles] = useState([]);

  useEffect(() => {
    if (theme.name === "Night") updateTheme();

    const headers = {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authentication: currentUser.uid,
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
  }, [currentUser, theme, updateTheme]);

  function setButtons() {
    setButtonTitles(JSON.parse(localStorage.getItem("titles")));
  }

  function createButtons() {
    return buttonTitles.map((title) => (
      <EditPageButton
        key={title.camelCase}
        title={title.str}
        setButtons={setButtons}
      />
    ));
  }

  return (
    <div className="home-page-container fade-in" id="app-homepage">
      {isLoading || error ? (
        <EditMessageBoard loading={isLoading} error={error} />
      ) : (
        <EditMainPage create={createButtons} theme={theme} />
      )}
    </div>
  );
};

const EditMainPage = (props) => {
  return (
    <>
      <div className="edit-main-but-container" id="edit-main-buttons">
        <EditSaveButton />
        <EditCancelButton />
      </div>
      <div className="button-container" id="button-container">
        <nav aria-labelledby="content-navigation">{props.create()}</nav>
      </div>
    </>
  );
};

const EditMessageBoard = (props) => {
  return (
    <div className="loading-container">
      {props.loading ? <LoadingIcon /> : props.error}
    </div>
  );
};

export default EditHomePage;
