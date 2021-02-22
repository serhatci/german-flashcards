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
    </>
  );
};

const WelcomeInfo = () => {
  const { currentUser, username } = useAuth();
  const env = process.env.NODE_ENV;

  if (username === "master" && !currentUser)
    return (
      <p>{`(${env}) Hello Guest! You can signup and have your own flashcards`}</p>
    );

  if (username === "master" && currentUser)
    return <p>{`(${env}) Welcome Master!`}</p>;

  return (
    <p>{`(${env}) Hello ${username}! Use settings button to create your own flashcards.`}</p>
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

export default HomePage;
