import { EditButton, AddNewData } from "../buttons/EditButtons";
import { useData } from "../../contexts/DataContext";
import "./edit.css";

const EditHomePage = () => {
  const { titles } = useData();
  const editPage = "homepage";

  function createButtons() {
    return titles.map((title) => (
      <EditButton
        key={title.camelCase}
        title={title.str}
        editPage={editPage}
      />
    ));
  }

  return (
    <div className="home-page-container fade-in" id="app-homepage">
      <div className="edit-button-container" id="button-container">
        <div className="plusIcon-container" id="plusIcon-container">
          <AddNewData editPage={editPage} />
        </div>
        <nav aria-labelledby="content-navigation">{createButtons()}</nav>
      </div>
    </div>
  );
};

export default EditHomePage;
