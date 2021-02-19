import { useRef } from "react";
import ContentEditable from "react-contenteditable";
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
      <div className="edit-home-buttons" id="edit-buttons" style={props.style}>
        {props.title}
      </div>
    </>
  );
};

export const NewButton = (props) => {
  const text = useRef(props.title);

  const handleChange = (evt) => {
    text.current = evt.target.value;
  };

  const handleBlur = () => {
    console.log(text.current);
  };
  return (
    <>
      <div
        className="edit-home-buttons"
        id="edit-home-buttons"
        style={props.style}>
        <ContentEditable
          html={text.current}
          onBlur={handleBlur}
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
      className="edit-delete-but"
      id="delete-button"
      onClick={() => props.deleteButton()}>
      DELETE
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
