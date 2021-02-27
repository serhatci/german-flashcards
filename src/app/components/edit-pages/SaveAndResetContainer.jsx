import { useRef, useEffect, useState, memo } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";
import "./edit.css";

const SaveAndResetContainer = memo(() => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [successMsg, setSuccessMsg] = useState();

  const style = location.pathname.includes("edit-")
    ? "edit-box-container show"
    : "edit-box-container hide";
  const editPage = location.pathname.includes("/edit-homepage")
    ? "homepage"
    : "flashcards";

  if (!currentUser) return "";

  return (
    <div className={style} id="edit-box-container">
      <div className="edit-box">
        <EditSaveButton
          location={location.pathname}
          editPage={editPage}
          setSuccessMsg={setSuccessMsg}
        />
        <EditResetButton
          location={location.pathname}
          editPage={editPage}
          setSuccessMsg={setSuccessMsg}
          style={style}
        />
        {successMsg ? (
          <MessageBox successMsg={successMsg} setSuccessMsg={setSuccessMsg} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
});

const EditSaveButton = (props) => {
  const { currentUser } = useAuth();
  const { titles, flashcards, fetchAgain } = useData();

  const msgBody =
    props.editPage === "homepage"
      ? { id: currentUser.uid, topics: titles.map((title) => title.str) }
      : { id: currentUser.uid, cards: flashcards };

  async function saveToDB() {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(msgBody),
    };

    await fetch("http://127.0.0.1:5000/api/update-data", options)
      .then((response) => {
        if (response.ok) {
          fetchAgain();
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
      onClick={() => saveToDB()}>
      Save Changes
    </button>
  );
};

const EditResetButton = (props) => {
  const { setTitles, setFlashcards, reFetch } = useData();
  const initialTitles = useRef();
  const initialFlashcards = useRef();

  useEffect(() => {
    initialTitles.current = JSON.parse(localStorage.getItem("titles"));
    initialFlashcards.current = JSON.parse(localStorage.getItem("flashcards"));

    if (props.style.includes("hide")) {
      setFlashcards(initialFlashcards.current);
      setTitles(initialTitles.current);
    }
  }, [reFetch, props, setFlashcards, setTitles]);

  function setInitialButtons() {
    if (props.editPage === "homepage") {
      setTitles(initialTitles.current);
      return props.setSuccessMsg("Reset Done!");
    }
    setFlashcards(initialFlashcards.current);
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
