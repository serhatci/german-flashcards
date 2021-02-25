import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { PlusIcon } from "../icons/Icons";
import ContentEditable from "react-contenteditable";
import { useData } from "../../contexts/DataContext";
import { useEditData } from "./EditDataCustomHook";
import "./edit.css";

const EditFlashcards = () => {
  const { flashcards } = useData();
  const location = useLocation();
  const flashcardsTitle = location.pathname.replace("/edit-flashcards/", "");
  const flashcardsData = flashcards[flashcardsTitle];

  function createButtons() {
    return flashcardsData.map((card) => (
      <EditButton
        key={`${card.question} - ${card.answer}`}
        buttonTitle={`${card.question} - ${card.answer}`}
        flashcardsTitle={flashcardsTitle}
        card={card}
      />
    ));
  }

  return (
    <div className="home-page-container fade-in" id="app-homepage">
      <div className="edit-button-container" id="button-container">
        <div className="plusIcon-container" id="plusIcon-container">
          <AddNewData flashcardsTitle={flashcardsTitle} />
        </div>
        <nav aria-labelledby="content-navigation">{createButtons()}</nav>
      </div>
    </div>
  );
};

const EditButton = (props) => {
  const [editFlashcardsClicked, setEditFlashcardsClicked] = useState(false);

  const targetView = editFlashcardsClicked ? (
    <FlashcardsInput
      setClicked={setEditFlashcardsClicked}
      flashcardsTitle={props.flashcardsTitle}
      card={props.card}
      method="edit"
    />
  ) : (
    <div className="edit-page-buttons fade-in" id="edit-buttons">
      <DeleteFlashcardButton
        flashcardsTitle={props.flashcardsTitle}
        card={props.card}
      />
      <EditFlashcardButton
        setEditFlashcardsClicked={setEditFlashcardsClicked}
      />
      {props.buttonTitle}
    </div>
  );

  return targetView;
};

const DeleteFlashcardButton = (props) => {
  const { deleteFlashcard } = useEditData();

  return (
    <button
      className="edit-title-buttons delete"
      id="delete-flashcard-button"
      onClick={() => deleteFlashcard(props.flashcardsTitle, props.card)}>
      DELETE
    </button>
  );
};

const EditFlashcardButton = (props) => {
  return (
    <button
      className="edit-title-buttons add-title"
      id="edit-flashcard-button"
      onClick={() => props.setEditFlashcardsClicked(true)}>
      EDIT
    </button>
  );
};

const AddNewData = (props) => {
  const [clicked, setClicked] = useState(false);
  return clicked ? (
    <FlashcardsInput
      setClicked={setClicked}
      flashcardsTitle={props.flashcardsTitle}
      method="add"
    />
  ) : (
    <PlusIcon setClicked={setClicked} />
  );
};

const FlashcardsInput = (props) => {
  const { addFlashcard, editFlashcard } = useEditData();

  const question = useRef(
    `${props.method === "edit" ? props.card.question : ""}`
  );
  const questionExtra = useRef(
    `${props.method === "edit" ? props.card.questionExtra : ""}`
  );
  const answer = useRef(`${props.method === "edit" ? props.card.answer : ""}`);
  const answerExtra = useRef(
    `${props.method === "edit" ? props.card.answerExtra : ""}`
  );

  function handleInput() {
    let result = () => {
      if (props.method === "add") {
        return addFlashcard(
          question.current,
          questionExtra.current,
          answer.current,
          answerExtra.current,
          props.flashcardsTitle
        );
      } else {
        return editFlashcard(
          question.current,
          questionExtra.current,
          answer.current,
          answerExtra.current,
          props.flashcardsTitle,
          props.card
        );
      }
    };
    if (result()) return props.setClicked(false);
  }

  return (
    <div
      className="edit-page-buttons flashcards fade-in"
      id="edit-flashcard-buttons">
      <div>
        <p>**QUESTION:</p>
        <ContentEditable
          html={question.current}
          onChange={(evt) => (question.current = evt.target.value)}
          style={{ outline: "0px solid transparent", paddingLeft: "10%" }}
        />
      </div>
      <div>
        <p>Extra Info:</p>
        <ContentEditable
          html={questionExtra.current}
          onChange={(evt) => (questionExtra.current = evt.target.value)}
          style={{ outline: "0px solid transparent", paddingLeft: "10%" }}
        />
      </div>
      <div>
        <p>**ANSWER:</p>
        <ContentEditable
          html={answer.current}
          onChange={(evt) => (answer.current = evt.target.value)}
          style={{ outline: "0px solid transparent", paddingLeft: "10%" }}
        />
      </div>
      <div>
        <p>Extra Info:</p>
        <ContentEditable
          html={answerExtra.current}
          onChange={(evt) => (answerExtra.current = evt.target.value)}
          style={{ outline: "0px solid transparent", paddingLeft: "10%" }}
        />
      </div>
      <AddOrEditButton
        action={handleInput}
        title={props.method === "add" ? "ADD CARD" : "CONFIRM"}
      />
      <CancelButton setClicked={props.setClicked} />
    </div>
  );
};

const AddOrEditButton = (props) => {
  return (
    <button
      className="edit-title-buttons add-title"
      id="add-title-button"
      onClick={() => props.action()}>
      {props.title}
    </button>
  );
};

const CancelButton = (props) => {
  return (
    <button
      className="edit-title-buttons cancel"
      id="cancel-flashcard-button"
      onClick={() => props.setClicked(false)}>
      CANCEL
    </button>
  );
};

export default EditFlashcards;
