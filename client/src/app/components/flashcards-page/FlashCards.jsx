import React, { useState } from "react";

import { Words, Score, PlayAgain, GameButtons } from "./Flashcards-components";
import { useButtons } from "../../contexts/ButtonsContext";
import { useData } from "../../contexts/DataContext";
import "./flash-cards.css";

const FlashCards = (props) => {
  const { flashcards } = useData();
  const data = flashcards[props.match.params.title];

  const regularOrder = useButtons();
  const [isCardAQuestion, setIsCardAQuestion] = useState(false);
  const [progress, setProgress] = useState({
    total: 0,
    correctAnswer: 0,
    wrongAnswer: 0,
  });
  const [completed, setCompleted] = useState(false);

  function getPage() {
    if (!data.length) {
      return [
        <Words cardData={["Empty!", "Use settings to add new flashcards"]} />,
        [],
      ];
    }
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
    cardData = regularOrder.shuffle
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
