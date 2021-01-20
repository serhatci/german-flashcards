import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, UserIcon } from "../icons/Icons.jsx";
import "./header-footer.css";
import { UserProvider } from "../../contexts/UserContext";

const Header = () => {
  return (
    <div
      className="flex-horizontal header-footer-container"
      id="header-container"
    >
      <div id="home-icon">
        <Link to="/">
          <HomeIcon />
        </Link>
      </div>
      <div id="title">
        <h2>German Flashcards</h2>
      </div>
      <div id="user-icon">
        <Link to="/login">
          <UserProvider>
            <UserIcon />
          </UserProvider>
        </Link>
      </div>
    </div>
  );
};

export default Header;
