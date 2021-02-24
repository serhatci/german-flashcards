import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import update from "immutability-helper";

import { PlusIcon } from "../icons/Icons";
import ContentEditable from "react-contenteditable";
import { useData } from "../../contexts/DataContext";
import {
  correctInput,
  duplicateFlashcardsCheck,
} from "../edit-pages/inputCheckFunctions";
import "./edit.css";

const EditFlashcards = () => {
  const { flashcards } = useData();
  const location = useLocation();
  const flashcardsTitle = location.pathname.replace("/edit-flashcards/", "");
  const flashcardsData = flashcards[flashcardsTitle];

  function createButtons() {
    return flashcardsData.map((card) => (
      <EditButton
        key={`${card.answer} - ${card.question}`}
        buttonTitle={`${card.answer} - ${card.question}`}
        flashcardsTitle={flashcardsTitle}
        answer={card.answer}
        question={card.question}
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
  return (
    <div className="edit-page-buttons fade-in" id="edit-buttons">
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
      {props.buttonTitle}
    </div>
  );
};

const DeleteFlashcardButton = (props) => {
  const { flashcards, setFlashcards } = useData();

  function deleteFlashcard() {
    const newTitles = flashcards[props.flashcardsTitle].filter(
      ({ answer, question }) =>
        answer !== props.answer && question !== props.question
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

const EditFlashcardButton = (props) => {
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

const AddNewData = (props) => {
  const [clicked, setClicked] = useState(false);
  return clicked ? (
    <FlashcardsInput
      setClicked={setClicked}
      flashcardsTitle={props.flashcardsTitle}
    />
  ) : (
    <PlusIcon setClicked={setClicked} />
  );
};

const FlashcardsInput = (props) => {
  const { flashcards, setFlashcards } = useData();

  const question = useRef("");
  const questionExtra = useRef("");
  const answer = useRef("");
  const answerExtra = useRef("");

  function addFlashcard() {
    const correctedQuestion = correctInput(question.current);
    const correctedQuestionExtra = correctInput(questionExtra.current);
    const correctedAnswer = correctInput(answer.current);
    const correctedAnswerExtra = correctInput(answerExtra.current);

    if (!correctedQuestion || !correctedAnswer) return;

    const flashcardInput = {
      question: correctedQuestion,
      questionExtra: correctedQuestionExtra,
      answer: correctedAnswer,
      answerExtra: correctedAnswerExtra,
    };

    if (
      duplicateFlashcardsCheck(
        flashcardInput,
        flashcards[props.flashcardsTitle]
      )
    )
      return;

    const newFlashcards = update(flashcards, {
      [props.flashcardsTitle]: { $push: [flashcardInput] },
    });
    setFlashcards(newFlashcards);
    props.setClicked(false);
  }

  return (
    <div
      className="edit-page-buttons flashcards fade-in"
      id="edit-flashcard-buttons">
      <div>
        <p>**Question:</p>
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
        <p>**Answer:</p>
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
      <AddButton add={addFlashcard} />
    </div>
  );
};

const AddButton = (props) => {
  return (
    <button
      className="edit-title-buttons add-title"
      id="add-title-button"
      onClick={() => props.add()}>
      ADD CARD
    </button>
  );
};

export default EditFlashcards;
