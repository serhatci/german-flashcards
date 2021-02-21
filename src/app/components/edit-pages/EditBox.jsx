import { useLocation } from "react-router-dom";
import { EditSaveButton, EditResetButton } from "../buttons/EditButtons";
import "./edit.css";

const EditBox = () => {
  const location = useLocation();

  function getStyle() {
    let settingPagesInUse = location.pathname.includes("edit-");
    if (settingPagesInUse) {
      return "edit-box-container show";
    }
    return "edit-box-container hide";
  }

  return (
    <div className={getStyle()} id="edit-box-container">
      <div className="edit-box">
        <EditSaveButton />
        <EditResetButton />
      </div>
    </div>
  );
};

export default EditBox;
