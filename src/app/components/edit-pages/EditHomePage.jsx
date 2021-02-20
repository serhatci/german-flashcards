import React, { useEffect, useState } from "react";
import { useTheme, useThemeUpdate } from "../../contexts/ThemeContext";
import {
  EditSaveButton,
  EditResetButton,
  EditPageButton,
  AddButton,
} from "../buttons/EditButtons";
import "./edit.css";

const EditHomePage = () => {
  const theme = useTheme();
  const updateTheme = useThemeUpdate();

  const [buttonTitles, setButtonTitles] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (theme.name === "Night") updateTheme();

    let titles = JSON.parse(localStorage.getItem("titles"));
    if (titles) {
      localStorage.setItem("mockTitles", JSON.stringify(titles));
      return setButtons();
    } else {
      setError(true);
    }
  }, [theme, updateTheme, setError]);

  function setButtons() {
    setButtonTitles(JSON.parse(localStorage.getItem("mockTitles")));
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
      {error ? (
        <p>Error occurred! Click HOME icon and try again..."</p>
      ) : (
        <EditMainPage
          create={createButtons}
          theme={theme}
          setButtons={setButtons}
        />
      )}
    </div>
  );
};

const EditMainPage = (props) => {
  return (
    <>
      <div className="edit-main-but-container" id="edit-main-buttons">
        <EditSaveButton />
        <EditResetButton setButtons={props.setButtons} />
      </div>
      <div className="button-container" id="button-container">
        <div className="plusIcon-container" id="plusIcon-container">
          <AddButton setButtons={props.setButtons} />
        </div>
        <nav aria-labelledby="content-navigation">{props.create()}</nav>
      </div>
    </>
  );
};

export default EditHomePage;
