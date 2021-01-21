import React from "react";
import "./flash-cards.css";
import { newWords } from "../../database/mock-db.js";
import { FlipIcon, CorrectIcon, WrongIcon } from "../icons/Icons.jsx";

const Words = (props) => {
  return (
    <div className="word-container">
      <p className="word">{props.cardData[0]}</p>
      <p className="info">{props.cardData[1]}</p>
    </div>
  );
};

const Score = (props) => {
  return (
    <div className="fade-in word-container">
      <h3>You have completed all Flashcards.</h3>
      <div className="results" id="results">
        <p>
          Total Cards: <b>{props.result.total}</b>
        </p>
        <p>
          Correct Answers: <b>{props.result.correctAnswer}</b>
        </p>
        <p>
          Wrong Answers: <b>{props.result.wrongAnswer}</b>
        </p>
      </div>
    </div>
  );
};

const PlayAgain = (props) => {
  return (
    <div className="card-buttons">
      <FlipIcon
        func={props.func}
        styles="bi bi-arrow-repeat dark-red icon large rotate"
      />
    </div>
  );
};

class GameButtons extends React.Component {
  getStyles = () => {
    if (this.props.isCardAQuestion) {
      return {
        correctButton: "hide",
        flipButton: "bi bi-arrow-repeat icon large rotate delayed",
        wrongButton: "hide",
      };
    } else {
      return {
        correctButton:
          "show fade-in bi bi-check-square-fill dark-green icon large",
        flipButton: "bi bi-arrow-repeat icon medium",
        wrongButton: "show fade-in bi bi-x-square-fill dark-red icon large",
      };
    }
  };

  render() {
    return (
      <div className="card-buttons" id="card-buttons">
        <div
          className="flex-horizontal flex-width-400"
          id="answer-buttons-container"
        >
          <CorrectIcon
            func={this.props.bringNextWord}
            styles={this.getStyles().correctButton}
          />
          <FlipIcon
            func={this.props.changeCard}
            styles={this.getStyles().flipButton}
          />
          <WrongIcon
            func={this.props.bringNextWord}
            styles={this.getStyles().wrongButton}
          />
        </div>
      </div>
    );
  }
}

class FlashCards extends React.Component {
  constructor(props) {
    super(props);
    this.data = this.pullData();
    this.state = {
      regularOrder: true,
      isCardAQuestion: true,
      progress: { total: 0, correctAnswer: 0, wrongAnswer: 0 },
      completed: false,
    };
  }

  pullData = () => {
    return newWords;
  };

  getPage = () => {
    if (this.state.completed) {
      return [
        <Score result={this.state.progress} />,
        <PlayAgain func={this.restartGame} />,
      ];
    } else {
      return [
        <Words cardData={this.getCardData()} />,
        <GameButtons
          changeCard={this.changeGameState}
          bringNextWord={this.bringNextWord}
          isCardAQuestion={this.state.isCardAQuestion}
        />,
      ];
    }
  };

  getCardData = () => {
    let cardData = Object.values(this.data[this.state.progress.total]);
    if (!this.state.regularOrder) {
      cardData = [cardData[2], cardData[3], cardData[0], cardData[1]];
    }
    if (this.state.isCardAQuestion) {
      return cardData.slice(0, 2);
    } else {
      return cardData.slice(2, 4);
    }
  };

  changeGameState = () => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.isCardAQuestion = !stateCopy.isCardAQuestion;
    this.setState(stateCopy);
  };

  bringNextWord = (answer) => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy = this.countAnswers(answer, stateCopy);
    stateCopy.isCardAQuestion = !stateCopy.isCardAQuestion;
    stateCopy.progress.total = ++stateCopy.progress.total;
    if (this.data.length === stateCopy.progress.total) {
      stateCopy.completed = !stateCopy.completed;
    }
    this.setState(stateCopy);
  };

  countAnswers = (answer, stateCopy) => {
    if (answer) {
      stateCopy.progress.correctAnswer = ++stateCopy.progress.correctAnswer;
    } else {
      stateCopy.progress.wrongAnswer = ++stateCopy.progress.wrongAnswer;
    }
    return stateCopy;
  };

  restartGame = () => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.isCardAQuestion = true;
    stateCopy.progress = { total: 0, correctAnswer: 0, wrongAnswer: 0 };
    stateCopy.completed = false;
    this.setState(stateCopy);
  };

  render() {
    return (
      <div className="flashcards-container fade-in">
        {this.getPage()[0]}
        {this.getPage()[1]}
      </div>
    );
  }
}

export default FlashCards;
