import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useData } from "../../contexts/DataContext";
import "./edit.css";

const SaveAndResetContainer = () => {
  const { setTitles, setFlashcards } = useData();
  const location = useLocation();

  const style = location.pathname.includes("edit-")
    ? "edit-box-container show"
    : "edit-box-container hide";
  const editPage = location.pathname.includes("/edit-homepage")
    ? "homepage"
    : "flashcards";

  const initialTitles = useRef();
  const initialFlashcards = useRef();

  useEffect(() => {
    initialTitles.current = JSON.parse(localStorage.getItem("titles"));
    initialFlashcards.current = JSON.parse(localStorage.getItem("flashcards"));

    if (style.includes("hide")) {
      setFlashcards(initialFlashcards.current);
      setTitles(initialTitles.current);
    }
  }, [style, setFlashcards, setTitles]);

  return (
    <div className={style} id="edit-box-container">
      <div className="edit-box">
        <EditSaveButton
          initialTitles={initialTitles.current}
          initialFlashcards={initialFlashcards.current}
          location={location.pathname}
          editPage={editPage}
        />
        <EditResetButton
          initialTitles={initialTitles.current}
          initialFlashcards={initialFlashcards.current}
          location={location.pathname}
          editPage={editPage}
        />
      </div>
    </div>
  );
};

const EditSaveButton = (props) => {
  const { titles, flashcards } = useData();

  function saveToLocalStorage() {
    if (props.editPage === "homepage") {
      localStorage.setItem("titles", JSON.stringify(titles));
    }
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
  }

  return (
    <button
      className="edit-box-buttons save-changes"
      id="edit-save-button"
      onClick={() => saveToLocalStorage()}>
      Save Changes
    </button>
  );
};

const EditResetButton = (props) => {
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

export default SaveAndResetContainer;
