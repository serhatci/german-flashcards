import { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import { PlusIcon } from "../icons/Icons";
import { checkInput, toCamelCase } from "../edit-pages/inputCheckFunctions";
import "./buttons.css";

export const EditPageButton = (props) => {
  function deleteButton() {
    const buttons = JSON.parse(localStorage.getItem("mockTitles"));
    const newButtons = buttons.filter((button) => button.str !== props.title);
    localStorage.setItem("mockTitles", JSON.stringify(newButtons));
    props.setButtons();
  }

  return (
    <>
      <div
        className="edit-page-buttons fade-in"
        id="edit-buttons"
        style={props.style}>
        <EditDeleteButton deleteButton={deleteButton} />
        {props.title}
      </div>
    </>
  );
};

export const AddButton = (props) => {
  const [clicked, setClicked] = useState(false);

  return clicked ? (
    <NewButton
      title={props.title}
      style={props.style}
      setButtons={props.setButtons}
      setClicked={setClicked}
    />
  ) : (
    <PlusIcon setClicked={setClicked} />
  );
};

const NewButton = (props) => {
  const text = useRef("");

  const handleChange = (evt) => {
    text.current = evt.target.value;
  };

  function addTitle() {
    if (text.current === "") return props.setClicked(false);

    const correctedText = checkInput(text.current);
    let buttons = JSON.parse(localStorage.getItem("mockTitles"));
    const newButton = {
      camelCase: toCamelCase(correctedText),
      str: correctedText,
    };
    buttons.unshift(newButton);
    localStorage.setItem("mockTitles", JSON.stringify(buttons));
    props.setButtons();
    props.setClicked(false);
  }

  return (
    <div
      className="edit-page-buttons new fade-in"
      id="edit-page-buttons"
      style={props.style}>
      <ContentEditable
        html={text.current}
        onChange={handleChange}
        style={{ outline: "0px solid transparent" }}
      />
      <EditAddTitle addTitle={addTitle} />
    </div>
  );
};

export const EditDeleteButton = (props) => {
  return (
    <button
      className="edit-title-buttons delete"
      id="delete-button"
      onClick={() => props.deleteButton()}>
      DELETE
    </button>
  );
};

export const EditAddTitle = (props) => {
  return (
    <button
      className="edit-title-buttons add-title"
      id="add-title-button"
      onClick={() => props.addTitle()}>
      ADD TITLE
    </button>
  );
};

export const EditSaveButton = () => {
  return (
    <button className="edit-main-buttons save-changes" id="edit-save-button">
      Save Changes
    </button>
  );
};

export const EditResetButton = (props) => {
  const initialButtons = useRef(JSON.parse(localStorage.getItem("titles")));

  function setInitialButtons() {
    localStorage.setItem("mockTitles", JSON.stringify(initialButtons.current));
    props.setButtons();
  }

  return (
    <button
      className="edit-main-buttons edit-reset"
      id="edit-reset-button"
      onClick={() => setInitialButtons()}>
      Reset
    </button>
  );
};
