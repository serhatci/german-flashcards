import React from "react";
import { HomeIcon, UserIcon } from "../icons/Icons.jsx";
import "./header-footer.css";

const Header = () => {
  return (
    <div
      className="flex-horizontal header-footer-container"
      id="header-container"
    >
      <HomeIcon />
      <h1 id="app-title">German Flashcards</h1>
      <UserIcon />
    </div>
  );
};

export default Header;
