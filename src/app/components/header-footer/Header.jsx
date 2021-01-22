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
      <Link to="/">
        <HomeIcon />
      </Link>
      <h1 id="app-title">German Flashcards</h1>
      <Link to="/login">
        <UserProvider>
          <UserIcon />
        </UserProvider>
      </Link>
    </div>
  );
};

export default Header;
