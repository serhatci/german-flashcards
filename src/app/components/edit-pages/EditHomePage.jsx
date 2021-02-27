import { useRef, useState } from "react";

import { useData } from "../../contexts/DataContext";
import { PlusIcon } from "../icons/Icons";
import ContentEditable from "react-contenteditable";
import { useEditData } from "./EditDataCustomHook";
import "./edit.css";

const EditHomePage = () => {
  const { titles } = useData();

  function createButtons() {
    return titles.map((title) => (
      <EditButton key={title.camelCase} buttonTitle={title.str} />
    ));
  }

  return (
    <div className="home-page-container fade-in" id="app-homepage">
      <div className="edit-button-container" id="button-container">
        <div className="plusIcon-container" id="plusIcon-container">
          <AddNewData />
        </div>
        <nav aria-labelledby="content-navigation">{createButtons()}</nav>
      </div>
    </div>
  );
};

const EditButton = (props) => {
  return (
    <div className="edit-page-buttons fade-in" id="edit-buttons">
      <DeleteHomePageTitleButton buttonTitle={props.buttonTitle} />
      {props.buttonTitle}
    </div>
  );
};

const DeleteHomePageTitleButton = (props) => {
  const { deleteHomePageTitle } = useEditData();

  return (
    <button
      className="edit-title-buttons delete"
      id="delete-homepage-title-button"
      onClick={() => deleteHomePageTitle(props.buttonTitle)}>
      DELETE
    </button>
  );
};

const AddNewData = () => {
  const [clicked, setClicked] = useState(false);

  return clicked ? (
    <HomePageTitleInput setClicked={setClicked} />
  ) : (
    <PlusIcon setClicked={setClicked} />
  );
};

const HomePageTitleInput = (props) => {
  const { addHomePageTitle } = useEditData();
  const text = useRef("");

  const handleChange = (evt) => {
    text.current = evt.target.value;
  };

  const addTitle = () => {
    if (text.current === "") return;
    addHomePageTitle(text.current);
    props.setClicked(false);
  };

  return (
    <div className="edit-page-buttons new fade-in" id="edit-page-buttons">
      <ContentEditable
        html={text.current}
        onChange={handleChange}
        style={{ outline: "0px solid transparent" }}
      />
      <AddButton add={addTitle} />
      <CancelButton setClicked={props.setClicked} />
    </div>
  );
};

const AddButton = (props) => {
  return (
    <button
      className="edit-title-buttons add-title"
      id="add-title-button"
      onClick={() => props.add()}>
      ADD TITLE
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

export default EditHomePage;
