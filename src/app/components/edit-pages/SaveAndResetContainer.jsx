import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";
import "./edit.css";

const SaveAndResetContainer = () => {
  const { setTitles, setFlashcards } = useData();
  const location = useLocation();
  const [successMsg, setSuccessMsg] = useState();

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
          setSuccessMsg={setSuccessMsg}
        />
        <EditResetButton
          initialTitles={initialTitles.current}
          initialFlashcards={initialFlashcards.current}
          location={location.pathname}
          editPage={editPage}
          setSuccessMsg={setSuccessMsg}
        />
        {successMsg ? (
          <MessageBox successMsg={successMsg} setSuccessMsg={setSuccessMsg} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const EditSaveButton = (props) => {
  const { currentUser } = useAuth();
  const { titles, flashcards } = useData();

  const msgBody =
    props.editPage === "homepage"
      ? { id: currentUser.uid, topics: titles }
      : { id: currentUser.uid, cards: flashcards };

  async function saveToDB() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(msgBody),
    };

    await fetch("http://127.0.0.1:5000/api/save-data", options)
      .then(() => {
        saveToLocalStorage();
        props.setSuccessMsg("Saved!");
      })
      .catch(() => props.setSuccessMsg("Failed to Save :(("));
  }

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
      onClick={() => saveToDB()}>
      Save Changes
    </button>
  );
};

const EditResetButton = (props) => {
  const { setTitles, setFlashcards } = useData();

  function setInitialButtons() {
    if (props.editPage === "homepage") {
      setTitles(props.initialTitles);
      return props.setSuccessMsg("Reset Done!");
    }
    setFlashcards(props.initialFlashcards);
    props.setSuccessMsg("Reset Done!");
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

const MessageBox = (props) => {
  const getStyle = props.successMsg.includes("Failed")
    ? "edit-message-box fade-in fail"
    : "edit-message-box fade-in success";

  useEffect(() => {
    document.getElementById("edit-save-button").disabled = true;
    document.getElementById("edit-reset-button").disabled = true;
    setTimeout(() => {
      props.setSuccessMsg("");
    }, 3000);

    return () => {
      document.getElementById("edit-save-button").disabled = false;
      document.getElementById("edit-reset-button").disabled = false;
    };
  }, [props]);

  return <div className={getStyle}>{props.successMsg}</div>;
};

export default SaveAndResetContainer;
