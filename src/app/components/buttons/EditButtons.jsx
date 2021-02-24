import { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import { PlusIcon } from "../icons/Icons";
import {
  correctInput,
  toCamelCase,
  duplicateCheck,
} from "../edit-pages/inputCheckFunctions";
import "./buttons.css";
import { useData } from "../../contexts/DataContext";
import update from "immutability-helper";

export const EditButton = (props) => {
  function getEditButtons() {
    if (props.editPage === "homepage") {
      return <DeleteHomePageTitleButton title={props.title} />;
    }
    return (
      <>
        <DeleteFlashcardButton
          flashcardsTitle={props.flashcardsTitle}
          answer={props.answer}
          question={props.question}
        />
        <EditFlashcardButton
          flashcardsTitle={props.flashcardsTitle}
          answer={props.answer}
          question={props.question}
        />
      </>
    );
  }

  return (
    <div className="edit-page-buttons fade-in" id="edit-buttons">
      {getEditButtons()}
      {props.title}
    </div>
  );
};

export const DeleteHomePageTitleButton = (props) => {
  const { titles, setTitles } = useData();

  function deleteTitle() {
    const newHomePageTitles = titles.filter(
      (title) => title.str !== props.title
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

export const DeleteFlashcardButton = (props) => {
  const { flashcards, setFlashcards } = useData();

  function deleteFlashcard() {
    const newTitles = flashcards[props.flashcardsTitle].filter(
      (card) => card.answer !== props.answer
    );
    const newFlashcards = update(flashcards, {
      [props.flashcardsTitle]: { $set: newTitles },
    });
    setFlashcards(newFlashcards);
  }

  return (
    <button
      className="edit-title-buttons delete"
      id="delete-flashcard-button"
      onClick={() => deleteFlashcard()}>
      DELETE
    </button>
  );
};

export const EditFlashcardButton = (props) => {
  function editFlashcard() {}

  return (
    <button
      className="edit-title-buttons add-title"
      id="edit-flashcard-button"
      onClick={() => editFlashcard()}>
      EDIT
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

export const EditResetButton = (props) => {
  const { setTitles, setFlashcards } = useData();

  function setInitialButtons() {
    if (props.editPage === "homepage") {
      setTitles(props.initialTitles);
    }
    setFlashcards(props.initialFlashcards);
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
