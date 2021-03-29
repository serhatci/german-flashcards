import Button from "../buttons/HomePageButtons";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { LoadingIcon } from "../icons/Icons";
import { useData } from "../../contexts/DataContext";
import "./home-page.css";

const HomePage = () => {
  const { isLoading, fetchError } = useData();

  return (
    <div className="home-page-container fade-in" id="app-homepage">
      {isLoading || fetchError ? <MessageBoard /> : <MainPage />}
    </div>
  );
};

const MainPage = () => {
  const theme = useTheme();
  const { titles } = useData();
  titles.sort((a, b) => {
    var nameA = a.camelCase;
    var nameB = b.camelCase;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  function createButtons() {
    return titles.map((title) => (
      <Button
        key={title.camelCase}
        title={title.str}
        targetPage={"/flashcards/" + title.camelCase}
        style={theme.button}
      />
    ));
  }

  return (
    <>
      <div style={theme.welcome} className="welcome-info" id="welcome-info">
        <WelcomeInfo />
      </div>
      <div className="button-container" id="button-container">
        <nav aria-labelledby="content-navigation">{createButtons()}</nav>
      </div>
      {titles.length ? "" : <EmptyTitlesMessage />}
    </>
  );
};

const WelcomeInfo = () => {
  const { currentUser } = useAuth();
  const { username } = useData();

  if (username === "master" && !currentUser)
    return <p>{`Hello Guest! You can signup and have your own flashcards`}</p>;

  if (username === "master" && currentUser) return <p>{`Welcome Master!`}</p>;

  return (
    <p>{`Hello ${username}! Use settings button to create your own flashcards.`}</p>
  );
};

const MessageBoard = () => {
  const { isLoading, fetchError } = useData();

  return (
    <div className="loading-container">
      {isLoading ? <LoadingIcon /> : fetchError}
    </div>
  );
};

const EmptyTitlesMessage = () => {
  return (
    <div className="empty-title-msg" id="empty-title-msg">
      <p>Nothing here :((</p>
    </div>
  );
};

export default HomePage;
