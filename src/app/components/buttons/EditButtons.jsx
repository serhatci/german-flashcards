import { useRef, useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { PlusIcon } from "../icons/Icons";
import {
  correctInput,
  toCamelCase,
  duplicateCheck,
} from "../edit-pages/inputCheckFunctions";
import "./buttons.css";
import { useData } from "../../contexts/DataContext";
import { useLocation } from "react-router-dom";

export const EditButton = (props) => {
  return (
    <div className="edit-page-buttons fade-in" id="edit-buttons">
      <DeleteButton title={props.title} editPage={props.editPage} />
      {props.title}
    </div>
  );
};

export const DeleteButton = (props) => {
  const { titles, setTitles } = useData();

  function deleteButton() {
    if (props.editPage === "homepage") {
      const HomePageTitleInputs = titles.filter(
        (title) => title.str !== props.title
      );
      setTitles(HomePageTitleInputs);
    }
  }

  return (
    <button
      className="edit-title-buttons delete"
      id="delete-button"
      onClick={() => deleteButton()}>
      DELETE
    </button>
  );
};

export const AddNewData = (props) => {
  const [clicked, setClicked] = useState(false);

  function inputButton() {
    if (props.editPage === "homepage") {
      return <HomePageTitleInput setClicked={setClicked} />;
    }
  }

  return clicked ? inputButton() : <PlusIcon setClicked={setClicked} />;
};

const HomePageTitleInput = (props) => {
  const { titles, setTitles } = useData();
  const text = useRef("");

  const handleChange = (evt) => {
    text.current = evt.target.value;
  };

  function addTitle() {
    const correctedText = correctInput(text.current);

    if (duplicateCheck(correctedText, titles)) return;

    const HomePageTitleInput = {
      camelCase: toCamelCase(correctedText),
      str: correctedText,
    };
    const newTitles = [HomePageTitleInput].concat(titles);
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

export const AddButton = (props) => {
  return (
    <button
      className="edit-title-buttons add-title"
      id="add-title-button"
      onClick={() => props.add()}>
      ADD TITLE
    </button>
  );
};

export const EditSaveButton = () => {
  return (
    <button className="edit-box-buttons save-changes" id="edit-save-button">
      Save Changes
    </button>
  );
};

export const EditResetButton = () => {
  const { setTitles, setFlashcards } = useData();
  const location = useLocation();
  const initialTitles = useRef();
  const initialFlashcards = useRef();

  useEffect(() => {
    initialTitles.current = JSON.parse(localStorage.getItem("titles"));
    initialFlashcards.current = JSON.parse(localStorage.getItem("flashcards"));
  }, []);

  function setInitialButtons() {
    if (location.pathname.includes("/edit-homepage")) {
      setTitles(initialTitles.current);
    }
    setFlashcards(initialFlashcards.current);
  }

  return (
    <button
      className="edit-box-buttons edit-reset"
      id="edit-reset-button"
      onClick={() => setInitialButtons()}>
      Reset
    </button>
  );
};
