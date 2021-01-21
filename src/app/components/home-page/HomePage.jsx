import React from "react";
import Button from "../buttons/HomePageButtons.jsx";
import "./home-page.css";
import { homeButtonsData } from "../../database/mock-db.js";

const WelcomeInfo = () => {
  const info =
    "ENV: " +
    process.env.NODE_ENV +
    " ID: " +
    process.env.REACT_APP_FIREBASE_PROJECT_ID;
  return <p>{info}</p>;
};

class HomePage extends React.Component {
  createButtons = () => {
    let buttons = homeButtonsData.map((item) => (
      <Button key={item.title} title={item.title} targetPage="/flashcards" />
    ));
    return buttons;
  };

  render() {
    return (
      <div className="home-page-container fade-in" id="app-homepage">
        <div className="welcome-info" id="app-welcome-info">
          <WelcomeInfo />
        </div>
        <div className="button-container" id="app-button-container">
          <nav aria-labelledby="content-navigation">
            {this.createButtons()}
          </nav>
        </div>
      </div>
    );
  }
}

export default HomePage;
