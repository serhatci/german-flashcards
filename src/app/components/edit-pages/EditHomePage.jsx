import { useRef, useState } from "react";

import { useData } from "../../contexts/DataContext";
import { PlusIcon } from "../icons/Icons";
import ContentEditable from "react-contenteditable";
import {
  correctInput,
  toCamelCase,
  duplicateTitleCheck,
} from "../edit-pages/inputCheckFunctions";

import "./edit.css";

const EditHomePage = () => {
  const { titles, setTitles } = useData();

  function createButtons() {
    return titles.map((title) => (
      <EditButton key={title.camelCase} buttonTitle={title.str} />
    ));
  }

  return (
    <div className="home-page-container fade-in" id="app-homepage">
      <div className="edit-button-container" id="button-container">
        <div className="plusIcon-container" id="plusIcon-container">
          <AddNewData titles={titles} setTitles={setTitles} />
        </div>
        <nav aria-labelledby="content-navigation">{createButtons()}</nav>
      </div>
    </div>
  );
};

const EditButton = (props) => {
  return (
    <div className="edit-page-buttons fade-in" id="edit-buttons">
      <DeleteHomePageTitleButton buttonTitle={props.buttonTitle} />
      {props.buttonTitle}
    </div>
  );
};

const DeleteHomePageTitleButton = (props) => {
  const { titles, setTitles } = useData();

  function deleteTitle() {
    const newHomePageTitles = titles.filter(
      (title) => title.str !== props.buttonTitle
    );
    setTitles(newHomePageTitles);
  }

  return (
    <button
      className="edit-title-buttons delete"
      id="delete-homepage-title-button"
      onClick={() => deleteTitle()}>
      DELETE
    </button>
  );
};

const AddNewData = (props) => {
  const [clicked, setClicked] = useState(false);
  return clicked ? (
    <HomePageTitleInput setClicked={setClicked} />
  ) : (
    <PlusIcon setClicked={setClicked} />
  );
};

const HomePageTitleInput = (props) => {
  const { titles, setTitles } = useData();
  const text = useRef("");

  const handleChange = (evt) => {
    text.current = evt.target.value;
  };

  function addTitle() {
    const correctedText = correctInput(text.current);

    if (duplicateTitleCheck(correctedText, titles)) return;

    const homePageTitleInput = {
      camelCase: toCamelCase(correctedText),
      str: correctedText,
    };
    const newTitles = [homePageTitleInput].concat(titles);
    setTitles(newTitles);
    props.setClicked(false);
  }

  return (
    <div className="edit-page-buttons new fade-in" id="edit-page-buttons">
      <ContentEditable
        html={text.current}
        onChange={handleChange}
        style={{ outline: "0px solid transparent" }}
      />
      <AddButton add={addTitle} />
    </div>
  );
};

const AddButton = (props) => {
  return (
    <button
      className="edit-title-buttons add-title"
      id="add-title-button"
      onClick={() => props.add()}>
      ADD TITLE
    </button>
  );
};

export default EditHomePage;
