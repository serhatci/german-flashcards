import { useEffect, useState, memo } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";
import "./edit.css";

const SaveAndResetContainer = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [successMsg, setSuccessMsg] = useState();

  const style = location.pathname.includes("edit-")
    ? "edit-box-container show"
    : "edit-box-container hide";

  if (!currentUser) return "";

  return (
    <div className={style} id="edit-box-container">
      <div className="edit-box">
        <EditSaveButton setSuccessMsg={setSuccessMsg} />
        <EditResetButton setSuccessMsg={setSuccessMsg} style={style} />
        {successMsg ? (
          <MessageBox successMsg={successMsg} setSuccessMsg={setSuccessMsg} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const EditSaveButton = memo((props) => {
  const { currentUser } = useAuth();
  const { titles, flashcards } = useData();

  const msgBody = {
    userID: currentUser.uid,
    flashcard_titles: titles,
    cards: flashcards,
  };

  async function saveChanges() {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(msgBody),
    };

    await fetch("http://localhost:5000/api/update-data", options)
      .then((response) => {
        if (response.ok) {
          localStorage.setItem("titles", JSON.stringify(titles));
          localStorage.setItem("flashcards", JSON.stringify(flashcards));
          props.setSuccessMsg("Saved!");
        } else {
          throw Error;
        }
      })
      .catch(() => props.setSuccessMsg("Failed to Save :(("));
  }

  return (
    <button
      className="edit-box-buttons save-changes"
      id="edit-save-button"
      onClick={() => saveChanges()}>
      Save Changes
    </button>
  );
});

const EditResetButton = (props) => {
  const { setTitles, setFlashcards } = useData();

  function setInitialButtons() {
    setTitles(JSON.parse(localStorage.getItem("titles")));
    setFlashcards(JSON.parse(localStorage.getItem("flashcards")));
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
    }, 2500);

    return () => {
      document.getElementById("edit-save-button").disabled = false;
      document.getElementById("edit-reset-button").disabled = false;
    };
  }, [props]);

  return <div className={getStyle}>{props.successMsg}</div>;
};

export default SaveAndResetContainer;
