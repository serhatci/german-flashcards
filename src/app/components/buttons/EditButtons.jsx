import { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import { PlusIcon } from "../icons/Icons";
import { checkInput, toCamelCase } from "../edit-pages/inputCheckFunctions";
import "./buttons.css";

export const EditPageButton = (props) => {
  function deleteButton() {
    const buttons = JSON.parse(localStorage.getItem("titles"));
    const newButtons = buttons.filter((button) => button.str !== props.title);
    localStorage.setItem("titles", JSON.stringify(newButtons));
    props.setButtons();
  }

  return (
    <>
      <EditDeleteButton deleteButton={deleteButton} />
      <div className="edit-page-buttons" id="edit-buttons" style={props.style}>
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

  function confirmButton() {
    const correctedText = checkInput(text.current);
    let buttons = JSON.parse(localStorage.getItem("titles"));
    const newButton = {
      camelCase: toCamelCase(correctedText),
      str: correctedText,
    };
    buttons.unshift(newButton);
    localStorage.setItem("titles", JSON.stringify(buttons));
    props.setButtons();
    props.setClicked(false);
  }

  return (
    <>
      <EditConfirmButton confirm={confirmButton} />
      <div
        className="edit-page-buttons new"
        id="edit-page-buttons"
        style={props.style}>
        <ContentEditable
          html={text.current}
          onChange={handleChange}
          style={{ outline: "0px solid transparent" }}
        />
      </div>
    </>
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

export const EditConfirmButton = (props) => {
  return (
    <button
      className="edit-title-buttons confirm"
      id="confirm-button"
      onClick={() => props.confirm()}>
      CONFIRM
    </button>
  );
};

export const EditSaveButton = () => {
  return (
    <button className="edit-main-buttons save-changes">Save Changes</button>
  );
};

export const EditCancelButton = () => {
  return <button className="edit-main-buttons edit-cancel">Cancel</button>;
};
