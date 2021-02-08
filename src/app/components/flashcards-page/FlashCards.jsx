import React, { useEffect, useState } from "react";
import "./flash-cards.css";
import { newWords } from "../../database/mock-db.js";
import { FlipIcon, CorrectIcon, WrongIcon } from "../icons/Icons.jsx";
import { useTheme } from "../../contexts/ThemeContext";

const Words = (props) => {
  const theme = useTheme();
  return (
    <div className="word-container" style={theme.words}>
      <p className="word">{props.cardData[0]}</p>
      <p className="info">{props.cardData[1]}</p>
    </div>
  );
};

const Score = (props) => {
  const theme = useTheme();
  return (
    <div className="fade-in word-container">
      <div className="score-box" id="score" style={theme.score}>
        <strong>You have completed all Flashcards!</strong>
        <table id="score-table">
          <tbody>
            <tr>
              <td>Total Cards Played: </td>
              <td>
                <strong>{props.result.total}</strong>
              </td>
            </tr>
            <tr>
              <td>Correct Answers: </td>
              <td>
                <strong>{props.result.correctAnswer}</strong>
              </td>
            </tr>
            <tr>
              <td>Wrong Answers: </td>
              <td>
                <strong>{props.result.wrongAnswer}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PlayAgain = (props) => {
  return (
    <div className="card-buttons">
      <FlipIcon
        func={props.func}
        styles="bi bi-arrow-repeat icon large rotate"
      />
    </div>
  );
};

const GameButtons = (props) => {
  function getStyles() {
    return props.isCardAQuestion
      ? {
          correctButton: "hide",
          flipButton: "bi bi-arrow-repeat icon large rotate delayed",
          wrongButton: "hide",
        }
      : {
          correctButton: "show fade-in bi bi-check-square-fill icon large",
          flipButton: "bi bi-arrow-repeat icon medium",
          wrongButton: "show fade-in bi bi-x-square-fill icon large",
        };
  }

  return (
    <div className="card-buttons" id="card-buttons">
      <div
        className="flex-horizontal flex-width-400"
        id="answer-buttons-container"
      >
        <CorrectIcon
          func={props.bringNextWord}
          styles={getStyles().correctButton}
        />
        <FlipIcon func={props.changeCard} styles={getStyles().flipButton} />
        <WrongIcon
          func={props.bringNextWord}
          styles={getStyles().wrongButton}
        />
      </div>
    </div>
  );
};

const FlashCards = () => {
  const data = pullData();

  const [regularOrder, setRegularOrder] = useState(true);
  const [isCardAQuestion, setIsCardAQuestion] = useState(true);
  const [progress, setProgress] = useState({
    total: 0,
    correctAnswer: 0,
    wrongAnswer: 0,
  });
  const [completed, setCompleted] = useState(false);

  function pullData() {
    return newWords;
  }

  function getPage() {
    return completed
      ? [<Score result={progress} />, <PlayAgain func={restartGame} />]
      : [
          <Words cardData={getCardData()} />,
          <GameButtons
            changeCard={reverseCards}
            bringNextWord={bringNextWord}
            isCardAQuestion={isCardAQuestion}
          />,
        ];
  }

  function getCardData() {
    let cardData = Object.values(data[progress.total]);
    cardData = regularOrder
      ? cardData
      : [cardData[2], cardData[3], cardData[0], cardData[1]];
    return isCardAQuestion ? cardData.slice(0, 2) : cardData.slice(2, 4);
  }

  function reverseCards() {
    setIsCardAQuestion(!isCardAQuestion);
  }

  function bringNextWord(answer) {
    answer
      ? setProgress({
          total: ++progress.total,
          correctAnswer: ++progress.correctAnswer,
          wrongAnswer: progress.wrongAnswer,
        })
      : setProgress({
          total: ++progress.total,
          correctAnswer: progress.correctAnswer,
          wrongAnswer: ++progress.wrongAnswer,
        });

    setIsCardAQuestion(!isCardAQuestion);
    if (data.length === progress.total) {
      setCompleted(!completed);
    }
  }

  function restartGame() {
    setIsCardAQuestion(true);
    setProgress({ total: 0, correctAnswer: 0, wrongAnswer: 0 });
    setCompleted(false);
  }

  return (
    <div className="flashcards-container fade-in">
      {getPage()[0]}
      {getPage()[1]}
    </div>
  );
};

export default FlashCards;
