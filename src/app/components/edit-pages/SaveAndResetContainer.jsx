import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { EditSaveButton, EditResetButton } from "../buttons/EditButtons";
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

export default SaveAndResetContainer;
