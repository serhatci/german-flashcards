import React from "react";
import flipIcon from "./arrow-repeat.svg";
import checkIcon from "./check-square-fill.svg";
import xSquareIcon from "./x-square-fill.svg";

const FlipButton = (props) => {
  return (
    <img
      className={props.styles}
      id="flipButton"
      alt="flipButton"
      src={flipIcon}
      onClick={() => props.func()}
    ></img>
  );
};

const CorrectButton = (props) => {
  return (
    <img
      className={props.styles}
      id="correctButton"
      alt="correct"
      src={checkIcon}
      onClick={() => props.func(true)}
    ></img>
  );
};

const WrongButton = (props) => {
  return (
    <img
      className={props.styles}
      id="wrongButton"
      alt="wrongButton"
      src={xSquareIcon}
      onClick={() => props.func(false)}
    ></img>
  );
};

export { FlipButton, CorrectButton, WrongButton };
